const asyncHandler = require("../../utils/asyncHandler");
const productService = require("../../services/productService/productService");

exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getProducts();
  if (products && products.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Proucts fetched successfully",
      data: { products },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No products found",
    data: { products: [] },
  });
});

exports.getSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const product = await productService.getProductById(productId);
  return res.status(200).json({
    status: true,
    message: "Prouct fetched successfully",
    data: { product },
  });
});

exports.addProduct = asyncHandler(async (req, res) => {
  const product = await productService.createNewProduct(req.body);
  return res.status(201).json({
    status: true,
    message: "Prouct created successfully",
    data: { product },
  });
});
