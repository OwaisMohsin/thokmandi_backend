const asyncHandler = require("../../utils/asyncHandler");
const productService = require("../../services/productService/productService");

exports.getAllProducts = asyncHandler(async (req, res) => {
  const pageNumber = req.query.page;
  console.log(pageNumber);
  
  const { products, totalCount } = await productService.fetchAllProducts(pageNumber);

  if (products && products.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      data: { products, totalCount },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No products found",
    data: { products: [] },
  });
});

exports.getProductsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const page = req.query.page;
  const {products,totalCount} = await productService.fetchProductsByCategory(page,category);
  if (products && products.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      data: { products, totalCount },
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
    message: "Product fetched successfully",
    data: { product },
  });
});

exports.addProductReview = asyncHandler(async (req,res) => {
  console.log("logging... ",req.user.id, req.body);
  const userId = req.user.id;
  
  if(!userId){
    return res.status(400).json({status:false,message:"Token missing from header"})
  }
  const review = await productService.createProductReview(userId,req.body);
  return res.status(201).json({
    status: true,
    message: "Review created successfully",
    data: { review },
  });

})
