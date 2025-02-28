const prisma = require("../../config/db");

exports.getAllProducts = async () => {
  return await prisma.product.findMany({
    select:{
        id:true,
        title:true,
        price:true,
        image:true
    }
  });
};

exports.findProductById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.createProduct = async (data) => {
  return await prisma.product.create({
    data,
  });
};
