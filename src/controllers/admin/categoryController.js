const asyncHandler = require("../../utils/asyncHandler");
const categoryService = require("../../services/categoryService/categoryService");
const { category } = require("../../config/db");

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();
  if (categories && categories.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Categories found",
      data: { categories },
    });
  }
  return res
    .status(200)
    .json({ status: true, message: "No Data Found", data: { categories: [] } });
});

exports.createProductCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  return res.status(201).json({
    status: true,
    messag: "Category created succesfully",
    data: { category },
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  const data = req.body;
  
  const updatedCategory = await categoryService.updateSingleCategory(
    categoryId,
    data
  );
  return res
    .status(201)
    .json({
      status: true,
      message: "Category updated successfully",
      data: { category: updatedCategory },
    });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  await categoryService.deleteSingleCategory(categoryId);
  return res.stats(200).json({
    state: true,
    message: "Category deleted succesfully!",
  });
});
