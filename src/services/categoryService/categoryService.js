const prisma = require("../../config/db");
const categoryRepository = require("../../repositories/categoryRepository/categoryRepository");
const AppError = require("../../utils/AppError");

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

exports.updateSingleCategory = async (id, data) => {
  try {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
      throw new AppError("Category doesnt exist with provided ID", 404);
    }
    return await categoryRepository.updateCategoryById(id, data);
  } catch (error) {
    throw error;
  }
};

exports.deleteSingleCategory = async (id) => {
  try {
    const category = await categoryRepository.getCategoryById(id);
    if (category) {
      return await categoryRepository.deleteCategoryById(id);
    }
    throw new AppError("Category doesnt exist with provided ID", 404);
  } catch (error) {
    throw error;
  }
};
