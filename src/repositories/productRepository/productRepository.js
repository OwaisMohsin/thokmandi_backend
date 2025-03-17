const prisma = require("../../config/db");

exports.getAllProducts = async (page, limit) => {
  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        price: true,
        image: true,
      },
    }),
    prisma.product.count(), // ✅ Get total count in the same transaction
  ]);

  return { products, totalCount };
};

exports.findProductById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      attributes: {
        include: {
          values: true,
        },
      },
      ProductTags:{
        include:{
          tag:true
        }
      },
      productCategories: {
        include: {
          category: true,
        },
      },
    },
  });
};

exports.getProductsByCategory = async (categoryId, page, limit) => {
  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        categoryId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.product.count({
      where: {
        categoryId,
      },
    }),
  ]);

  return { products, totalCount };
};

exports.createProduct = async (data) => {
  return await prisma.product.create({
    data,
  });
};

exports.addProductCategories = async (data) => {
  return await prisma.productCategory.create({ data });
};

exports.addTag = async (data) => {
  return await prisma.tag.create({ data });
};

exports.createProductTag = async (data) => {
  return await prisma.productTag.create({ data });
};

exports.addProductAttribute = async (data) => {
  return await prisma.attribute.create({ data });
};

exports.addAttributeValue = async (data) => {
  return await prisma.attributeValue.create({ data });
};

exports.createUpsellProduct = async (data) => {
  return await prisma.productUpsell.create({ data });
};

exports.createCrossSellProduct = async (data) => {
  return await prisma.productCrossSell.create({ data });
};

exports.createGroupedProduct = async (data) => {
  return await prisma.productGroupItem.create({ data });
};
