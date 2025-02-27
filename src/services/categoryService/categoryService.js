const prisma = require("../../config/db");
const categoryRepository = require("../../repositories/categoryRepository/categoryRepository");

exports.getCategories = async () => {
  try {
    return await categoryRepository.getAllCategories();
  } catch (error) {
    throw error;
  }
};

exports.createCategory = async (data) => {
  try {
    let updatedData = {};
    if (data.parentCategory) {
      updatedData = {
        ...data,
        parent: { connect: { id: parseInt(data.parentId, 10) } },
      };
    } else {
      updatedData = data;
    }

    const category = await categoryRepository.createProductCategory(
      updatedData
    );
    return category;
  } catch (error) {
    throw error;
  }
};


