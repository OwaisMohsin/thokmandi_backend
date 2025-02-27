const prisma = require("../../config/db");

exports.getAllCategories = async () => {
    return await prisma.category.findMany({
      where: {
        parentId: null, // Get only main categories
      },
      include: {
        subcategories: true, // Fetch subcategories for each main category
      },
    });
  };

exports.createProductCategory = async (data) => {
  return await prisma.category.create({
    data,
  });
};

