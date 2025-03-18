const prisma = require("../../config/db");

exports.getAllUsers = async () => {
  return await prisma.user.findMany();
};


exports.getAllProductsCount = async () => {
    return await prisma.product.count();
}
