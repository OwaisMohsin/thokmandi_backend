const productRepository = require("../../repositories/productRepository/productRepository");
const categoryRepository = require('../../repositories/categoryRepository/categoryRepository');
const AppError = require("../../utils/AppError");

exports.getProducts = async (pageNumber) => {
  try {
    const page = pageNumber || 1;
    const limit = 12;

    const { products, totalCount } = await productRepository.getAllProducts(
      page,
      limit
    );
    return { totalCount, products };
  } catch (error) {
    throw error;
  }
};

exports.getProductsCount = async () => {
  try {
    return await productRepository.countProduts;
  } catch (error) {}
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

exports.fetchProductsByCategory = async (pageNumber,categoryName) => {
try {
  const page = pageNumber || 1;
  const limit = 12;
  
  const category = await categoryRepository.getCategoryByName(categoryName)
  if(!category){
    throw new AppError("No category exist with provided name",404);
  }
  const { products, totalCount } = await productRepository.getProductsByCategory(
    category.id,
    page,
    limit
  );
  return { totalCount, products };
  
} catch (error) {
  throw error;
}
}

exports.createNewProduct = async (data) => {
  try {
    const product = await productRepository.createProduct(data);
    return product;
  } catch (error) {
    throw error;
  }
};
