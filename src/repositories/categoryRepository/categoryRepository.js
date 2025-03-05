const prisma = require("../../config/db");

exports.getAllCategories = async () => {
  return await prisma.category.findMany({
    where: {
      parentId: null, // Get only main categories
    },
    include: {
      subcategories: {
        include: {
          subcategories: true,
        },
      },
    },
  });
};

exports.getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.getCategoryByName = async (name) => {
  return await prisma.category.findFirst({
    where: { name },
  });
};

exports.updateCategoryById = async (id, data) => {
  return await prisma.category.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.deleteCategoryById = async (id) => {
  return await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
};

exports.createProductCategory = async (data) => {
  return await prisma.category.create({
    data,
  });
};
