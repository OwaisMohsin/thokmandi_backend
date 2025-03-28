const productRepository = require("../../repositories/productRepository/productRepository");
const wishlistRepository = require("../../repositories/wishlistRepository/wishlistRepository");
const AppError = require("../../utils/AppError");

exports.addItem = async (userId, data) => {
  try {
    const productId = data.productId;
    const product = await productRepository.findProductById(productId);
    if (!product) {
      throw new AppError("No product found with provided ID", 404);
    }
    const isProductAlreadyPresentInWishlist =
      await wishlistRepository.checkExistence(userId, productId);
    if (isProductAlreadyPresentInWishlist) {
      throw new AppError("Product is already in your wishlist", 409);
    }
    const wishlistItemData = {
      user: { connect: { id: Number(userId) } },
      product: { connect: { id: Number(productId) } },
    };
    return await wishlistRepository.addItemToWishlist(wishlistItemData);
  } catch (error) {
    throw error;
  }
};

exports.getItems = async (userId) => {
  try {
    return await wishlistRepository.getWishlistItems(userId);
  } catch (error) {
    throw error;
  }
};

exports.deleteItem = async (userId, id) => {
  try {
    const item = wishlistRepository.getWishlistItemById(userId, id);
    if (!item) {
      throw new AppError("No wishlist item found with provided ID", 404);
    }
    return await wishlistRepository.deleteItemById(id);
  } catch (error) {
    throw error;
  }
};

exports.removeAllItems = async (userId) => {
  try {
    return await wishlistRepository.deleteAllWishlistItems(userId);
  } catch (error) {
    throw error;
  }
};
