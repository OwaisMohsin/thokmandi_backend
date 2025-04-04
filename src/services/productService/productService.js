const productRepository = require("../../repositories/productRepository/productRepository");
const categoryRepository = require("../../repositories/categoryRepository/categoryRepository");
const AppError = require("../../utils/AppError");
const {
  ProductType,
  TaxStatus,
  TaxClass,
  StockStatus,
  ProductStatus,
  Visibility,
  BackOrder,
  ShippingClass,
} = require("@prisma/client");

exports.fetchAllProducts = async (pageNumber) => {
  try {
    
    const page = pageNumber || 1;
    const limit = 12;
    console.log(`Service - Page: ${page}, Limit: ${limit}`);
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
    // const dateFields = ["from", "to"];
    // dateFields.forEach((field) => {
    //   if (data[field] && data[field] !== "timestamp") {
    //     data[field] = new Date(data[field]);
    //   } else if (data[field] === "timestamp") {
    //     data[field] = new Date();
    //   }
    // });

    let type = "";
    let taxStatusType = "";
    let taxClassType = "";
    let stockStatusType = "";
    let productStatusType = "";
    let visibilityType = "";
    let backOrderType = "";
    let shippingClassType = "";

    switch (data.productType) {
      case "Simple":
        type = ProductType.SIMPLE;
        break;
      case "Variable":
        type = ProductType.VARIABLE;
        break;
      case "External":
        type = ProductType.AFFILIATE_PRODUCT;
        break;
      case "Group":
        type = ProductType.GROUP_PRODUCT;
        break;
      default:
        type = "";
    }

    switch (data.taxStatus) {
      case "Taxable":
        taxStatusType = TaxStatus.TAXABLE;
        break;
      case "Shipping Only":
        taxStatusType = TaxStatus.SHIPPING_ONLY;
        break;
      case "None":
        taxStatusType = TaxStatus.NONE;
        break;
      default:
        taxStatusType = "";
    }

    switch (data.taxClass) {
      case "Standard":
        taxClassType = TaxClass.STANDARD;
        break;
      case "Reduced Rate":
        taxClassType = TaxClass.REDUCED_RATE;
        break;
      case "Zero Rate":
        taxClassType = TaxClass.ZERO_RATE;
        break;
      default:
        taxClassType = "";
    }

    switch (data.shippingClass) {
      case "No Shipping Class (€0)":
        shippingClassType = ShippingClass.NONE;
        break;
      case "Portugal Flat Rate":
        shippingClassType = ShippingClass.PORTUGAL_FLAT_RATE;
        break;
      case "Flat Rate":
        shippingClassType = ShippingClass.FLAT_RATE;
        break;
      default:
        shippingClassType = "";
    }

    switch (data.stockStatus) {
      case "In Stock":
        stockStatusType = StockStatus.IN_STOCK;
        break;
      case "Out of Stock":
        stockStatusType = StockStatus.OUT_OF_STOCK;
        break;
      case "On Backorder":
        stockStatusType = StockStatus.ON_BACKORDER;
        break;
      default:
        stockStatusType = "";
    }

    switch (data.productStatus) {
      case "Online":
        productStatusType = ProductStatus.ONLINE;
        break;
      case "Draft":
        productStatusType = ProductStatus.DRAFT;
        break;
      default:
        productStatusType = "";
    }

    switch (data.visibility) {
      case "Visible":
        visibilityType = Visibility.VISIBLE;
        break;
      case "Hidden":
        visibilityType = Visibility.HIDDEN;
        break;
      case "Catalog":
        visibilityType = Visibility.CATALOG;
        break;
      case "Search":
        visibilityType = Visibility.SEARCH;
        break;
      default:
        visibilityType = "";
    }

    switch (data.backOrder) {
      case "Do Not Allow":
        backOrderType = BackOrder.DO_NOT_ALLOW;
        break;
      case "Allow, But Notify Customer":
        backOrderType = BackOrder.ALLOW_BUT_NOTIFY;
        break;
      case "Allow":
        backOrderType = BackOrder.ALLOW;
        break;
      default:
        backOrderType = "";
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
      from: data.from || null,
      to: data.to || null,
      shortDescription: data.shortDescription,
      description: data.description,
      sku: data.sku,
      stockStatus: stockStatusType || StockStatus.IN_STOCK,
      backOrder: backOrderType,
      stockManagement: data.stockManagement,
      stockQuantity: data.stockQuantity,
      lowStockThreshold: data.lowStockThreshold,

      limitOnePerOrder: data.limitOnePerOrder,
      shippingRequired: data.shippingRequired,
      weight: data.weight || 0.0,
      height: data.height || 0.0,
      length: data.length || 0.0,
      width: data.width || 0.0,
      seoTitle: data.seoTitle,
      metaDescription: data.metaDescription,
      focusKeyword: data.focusKeyword,
      slug: data.slug,
      shippingClass: shippingClassType,
      taxStatus: taxStatusType,
      taxClass: taxClassType,
      bulkDiscount: data.bulkDiscount,
      productStatus: productStatusType,
      visibility: visibilityType,
      enableReviews: data.enableReviews,

      vendor: { connect: { id: Number(vendorId) } },
    };

    const product = await productRepository.createProduct(productData);

    if (data.categories && data.categories.length > 0) {
      for (const category of data.categories) {
        let data = {
          product: { connect: { id: Number(product.id) } },
          category: { connect: { id: Number(category) } },
        };
        await productRepository.addProductCategories(data);
      }
      // data.categories.map(async (category) => {
      //   let data = {
      //     product: { connect: { id: Number(product.id) } },
      //     category: { connect: { id: Number(category) } },
      //   };
      //   await productRepository.addProductCategories(data);
      // });
    }

    if (data.tags && data.tags.length > 0) {
      for (const tag of data.tags) {
        const newTag = await productRepository.addTag({ name: tag });
        let tagData = {
          product: { connect: { id: Number(product.id) } },
          tag: { connect: { id: Number(newTag.id) } },
        };
        await productRepository.createProductTag(tagData);
      }
      // data.tags.map(async (tag) => {
      //   const newTag = await productRepository.addTag({ name: tag });
      //   let tagData = {
      //     product: { connect: { id: Number(product.id) } },
      //     tag: { connect: { id: Number(newTag.id) } },
      //   };
      //   await productRepository.createProductTag(tagData);
      // });
    }

    if (data.upsells && data.upsells.length > 0) {
      for (const upsellProductId of data.upsells) {
        let upsellData = {
          product: { connect: { id: Number(product.id) } },
          upsellProduct: { connect: { id: Number(upsellProductId) } },
        };
        await productRepository.createUpsellProduct(upsellData);
      }
      // data.upsells.map(async (upsellProductId) => {
      //   let upsellData = {
      //     product: { connect: { id: Number(product.id) } },
      //     upsellProduct: { connect: { id: Number(upsellProductId) } },
      //   };
      //   await productRepository.createUpsellProduct(upsellData);
      // });
    }

    if (data.crossSells && data.crossSells.length > 0) {
      for (const crossSellproductId of data.crossSells) {
        let crossSellsData = {
          product: { connect: { id: Number(product.id) } },
          crossSellProduct: { connect: { id: Number(crossSellproductId) } },
        };
        await productRepository.createCrossSellProduct(crossSellsData);
      }
      // data.crossSells.map(async (crossSellproductId) => {
      //   let crossSellsData = {
      //     product: { connect: { id: Number(product.id) } },
      //     crossSellProduct: { connect: { id: Number(crossSellproductId) } },
      //   };
      //   await productRepository.createCrossSellProduct(crossSellsData);
      // });
    }

    if (data.groupProducts && data.groupProducts.length > 0) {
      for (const groupProductId of data.groupProducts) {
        let groupProductData = {
          product: { connect: { id: Number(product.id) } },
          childProduct: { connect: { id: Number(groupProductId) } },
        };
        await productRepository.createGroupedProduct(groupProductData);
      }
      // data.groupProducts.map(async (groupProductId) => {
      //   let groupProductData = {
      //     product: { connect: { id: Number(product.id) } },
      //     childProduct: { connect: { id: Number(groupProductId) } },
      //   };
      //   await productRepository.createGroupedProduct(groupProductData);
      // });
    }

    if (data.attributes && Object.keys(data.attributes).length > 0) {
      Object.entries(data.attributes).forEach(
        async ([key, attributeValues]) => {
          const attributeData = {
            name: key,
            isVisible: attributeValues.isVisible,
            product: { connect: { id: Number(product.id) } },
          };
          const newAttribute = await productRepository.addProductAttribute(
            attributeData
          );
          for (const attributeName of attributeValues.values) {
            const attributeValueData = {
              attribute: { connect: { id: Number(newAttribute.id) } },
              value: attributeName,
            };
            await productRepository.addAttributeValue(attributeValueData);
          }
          // attributeValues.values?.map(async (attributeName) => {
          //   const attributeValueData = {
          //     attribute: { connect: { id: Number(newAttribute.id) } },
          //     value: attributeName,
          //   };
          //   await productRepository.addAttributeValue(attributeValueData);
          // });
        }
      );
    }

    return product;
  } catch (error) {
    throw error;
  }
};


exports.getAllProductTags = async (pageNumber) => {
  try {
    const page = pageNumber || 1;
    const limit = 4;

    return await productRepository.getProductTags(
      page,
      limit
    );
  } catch (error) {
    throw error;
  }
};

exports.findProductTags = async (data) => {
  try {
    return await productRepository.searchTags(data.keyword)
  } catch (error) {
    throw error;
  }
}

exports.getProducts = async (id) => {
  try {
    return await productRepository.getProductsByVendor(id);
  } catch (error) {
    throw error;
  }
}
