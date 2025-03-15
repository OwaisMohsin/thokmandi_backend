const productRepository = require("../../repositories/productRepository/productRepository");
const categoryRepository = require("../../repositories/categoryRepository/categoryRepository");
const AppError = require("../../utils/AppError");
const { ProductType } = require("@prisma/client");

exports.getProducts = async (pageNumber) => {
  try {
    const page = pageNumber || 1;
    const limit = 12;

    const { products, totalCount } = await productRepository.getAllProducts(
      page,
      limit
    );
    return { totalCount, products };
  } catch (error) {
    throw error;
  }
};

exports.getProductsCount = async () => {
  try {
    return await productRepository.countProduts;
  } catch (error) {}
};

exports.getProductById = async (id) => {
  try {
    const product = await productRepository.findProductById(id);
    if (product) {
      return product;
    }
    throw new AppError("No product found with provided ID", 404);
  } catch (error) {
    throw error;
  }
};

exports.fetchProductsByCategory = async (pageNumber, categoryName) => {
  try {
    const page = pageNumber || 1;
    const limit = 12;

    const category = await categoryRepository.getCategoryByName(categoryName);
    if (!category) {
      throw new AppError("No category exist with provided name", 404);
    }
    const { products, totalCount } =
      await productRepository.getProductsByCategory(category.id, page, limit);
    return { totalCount, products };
  } catch (error) {
    throw error;
  }
};

exports.createNewProduct = async (vendorId, data) => {
  try {
    const dateFields = ["from", "to"];
    dateFields.forEach((field) => {
      if (data[field] && data[field] !== "timestamp") {
        data[field] = new Date(data[field]);
      } else if (data[field] === "timestamp") {
        data[field] = new Date();
      }
    });

    let type = "";
    switch (data.productType) {
      case "simple":
        type = ProductType.SIMPLE;
        break;
      case "variable":
        type = ProductType.VARIABLE;
        break;
      case "affilate":
        type = ProductType.AFFILIATE_PRODUCT;
        break;
      case "group":
        type = ProductType.GROUP_PRODUCT;
        break;
      default:
        type = "";
    }

    const productData = {
      title: data.title,
      productType: type,
      isDownloadable: data.isDownloadable,
      isVirtual: data.isVirtual,
      productUrl: data.productUrl || "",
      buttonText: data.buttonText || "",
      price: data.price,
      discountedPrice: data.discountedPrice,
      from: data.from || "",
      to: data.to || "",
      shortDescription: data.shortDescription,
      description: data.description,
      sku: data.sku,
      stockStatus: data.stockStatus,
      stockManagement: data.stockManagement,
      stockQuantity: data.stockQuantity || "",
      lowStockThreshold: data.lowStockThreshold || "",
      limitOnePerOrder: data.limitOnePerOrder,
      shippingRequired: data.shippingRequired,
      // weight:data.weight || '',
      // height:data.height || '',
      // length: data.length || '',
      // width: data.width || '',
      seoTitle:data.seoTitle,
      metaDescription: data.metaDescription,
      focusKeyword: data.focusKeyword,
      slug: data.slug,
      shippingClass: data.shippingClass,
      taxStatus: data.taxStatus,
      taxClass: data.taxClass,
      bulkDiscount: data.bulkDiscount,
      visibility: data.visibility,
      enableReviews: data.enableReviews,

      vendor: { connect: { id: Number(vendorId) } },
    };

    const product = await productRepository.createProduct(productData);

    if (data.categories && data.categories.length > 0) {
      data.categories.map(async (category) => {
        let data = {
          product: { connect: { id: Number(product.id) } },
          category: { connect: { id: Number(category) } },
        };
        await productRepository.addProductCategories(data);
      });
    }

    if (data.tags && data.tags.length > 0) {
      data.tags.map(async (tag) => {
        const newTag = await productRepository.addTag({ name: tag });
        let tagData = {
          product: { connect: { id: Number(product.id) } },
          tag: { connect: { id: Number(newTag.id) } },
        };
        await productRepository.createProductTag(tagData);
      });
    }

    if (data.upsells && data.upsells.length > 0) {
      data.upsells.map(async (upsellProductId) => {
        let upsellData = {
          product: { connect: { id: Number(product.id) } },
          upsellProduct: { connect: { id: Number(upsellProductId) } },
        };
        await productRepository.createUpsellProduct(upsellData);
      });
    }

    if (data.crossSells && data.crossSells.length > 0) {
      data.crossSells.map(async (crossSellproductId) => {
        let crossSellsData = {
          product: { connect: { id: Number(product.id) } },
          crossSellProduct: { connect: { id: Number(crossSellproductId) } },
        };
        await productRepository.createCrossSellProduct(crossSellsData);
      });
    }

    if (data.groupProducts && data.groupProducts.length > 0) {
      data.groupProducts.map(async (groupProductId) => {
        let groupProductData = {
          product: { connect: { id: Number(product.id) } },
          childProduct: { connect: { id: Number(groupProductId) } },
        };
        await productRepository.createGroupedProduct(groupProductData);
      });
    }

    if (data.attributes) {
      Object.entries(data.attributes).forEach(async ([key, attributeValues]) => {
        const attributeData = {
          name: key,
          isVisible: attributeValues.isVisible,
          product: { connect: { id: Number(product.id) } },
        };
        const newAttribute = await productRepository.addProductAttribute(
          attributeData
        );
        attributeValues.values?.map(async (attributeName) => {
          const attributeValueData = {
            attribute: { connect: { id: Number(newAttribute.id) } },
            value: attributeName,
          };
          await productRepository.addAttributeValue(attributeValueData);
        });
      });
    }

    console.log("Products is", product);

    return product;
  } catch (error) {
    throw error;
  }
};
