const prisma = require("../../config/db");

exports.getAllUsers = async () => {
  return await prisma.user.findMany({
    select:{
      createdAt:true,
      role:true
    }
  });
};


exports.getAllProductsCount = async () => {
    return await prisma.product.count();
}
