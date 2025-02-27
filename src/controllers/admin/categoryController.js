const asyncHandler = require("../../utils/asyncHandler");
const categoryService = require("../../services/categoryService/categoryService");

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


