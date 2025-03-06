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
    include:{
      category:{
        select:{
          name:true
        }
      }
    }
  });
};

exports.getProductsByCategory = async (categoryId,page, limit) => {
  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where:{
        categoryId
      },
      include:{
        category:{
          select:{
            name:true
          }
        }
      }
    }),
    prisma.product.count({
      where:{
        categoryId
      }
    }),
  ]);

  return { products, totalCount };
};

exports.createProduct = async (data) => {
  return await prisma.product.create({
    data,
  });
};
