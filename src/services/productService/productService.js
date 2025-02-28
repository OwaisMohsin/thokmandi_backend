const productRepository = require("../../repositories/productRepository/productRepository");
const AppError = require("../../utils/AppError");

exports.getProducts = async (req, res) => {
  try {
    const products = await productRepository.getAllProducts();
    return products;
  } catch (error) {
    throw error;
  }
};

exports.getProductById = async (id) => {
  try {
    const product = await productRepository.findProductById(id);
    if (product) {
      return product;
    }
    throw new AppError("No product found with provided ID", 404);
  } catch (error) {
    throw error;
  }
};

exports.createNewProduct = async (data) => {
  try {
    const product = await productRepository.createProduct(data);
    return product;
  } catch (error) {
    throw error;
  }
};
