const asyncHandler = require("../../utils/asyncHandler");
const productService = require("../../services/productService/productService");



exports.addProduct = asyncHandler(async (req, res) => {
  const vendorId = req.user.id;
  const product = await productService.createNewProduct(vendorId,req.body);
  return res.status(201).json({
    status: true,
    message: "Prouct created successfully",
    data: { product },
  });
});
