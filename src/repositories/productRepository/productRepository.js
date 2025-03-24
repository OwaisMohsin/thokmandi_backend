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
    prisma.product.count(),
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
      ProductTags: {
        include: {
          tag: true,
        },
      },
      productCategories: {
        include: {
          category: true,
        },
      },
      vendor:{
        select:{
          store:{
            select:{
              shopName:true
            }
          }
        }
      }
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

exports.getProductTags = async (page, limit) => {
  return await prisma.tag.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
};

exports.searchTags = async (keyword) => {
  return await prisma.tag.findMany({
    where: {
      name: {
        contains: keyword,
        mode:"insensitive"
      },
    },
    orderBy:{
      name:"asc"
    }
  });
};


exports.getProductsByVendor = async (id) => {
  return await prisma.product.findMany({
    where:{
      vendorId:Number(id)
    }
  })
}

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
