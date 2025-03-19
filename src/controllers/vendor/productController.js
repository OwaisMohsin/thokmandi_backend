const asyncHandler = require("../../utils/asyncHandler");
const productService = require("../../services/productService/productService");


exports.getProductTags = asyncHandler(async(req,res) => {
  const pageNumber = req.query.page;
  const tags = await productService.getAllProductTags(pageNumber);
  if(tags && tags.length > 0){
    return res.status(200).json({
      status: true,
      message: "Tags fetch successfully",
      data: { tags },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No tags found",
    data: { tags:[] },
  });
});

exports.serachTag = asyncHandler(async(req,res) => {
  const searchTag = req.body;
  const tags = await productService.findProductTags(searchTag);
  if(tags && tags.length > 0){
    return res.status(200).json({
      status: true,
      message: "Tags fetch successfully",
      data: { tags },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No tags found",
    data: { tags:[] },
  });
})


exports.addProduct = asyncHandler(async (req, res) => {
  const vendorId = req.user.id;
  const product = await productService.createNewProduct(vendorId,req.body);
  return res.status(201).json({
    status: true,
    message: "Prouct created successfully",
    data: { product },
  });
});


exports.getVendorProducts = asyncHandler(async(req,res) => {
  const vendorId = req.user.id;
  const products = await productService.getProdoucts(vendorId);
  if(products && products.length > 0){
    return res.status(200).json({
      status: true,
      message: "Products fetch successfully",
      data: { products },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No products found",
    data: { products:[] },
  });
})
