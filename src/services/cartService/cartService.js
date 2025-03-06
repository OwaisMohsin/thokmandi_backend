const cartRepository = require("../../repositories/cartRepository/cartRepository");

exports.fetchUserCart = async (userId) => {
  try {
    return await cartRepository.getUserCart(userId);
  } catch (error) {
    throw error;
  }
};

exports.addItemToCart = async (userId, item) => {
  try {
    let cart = await cartRepository.getCartByUserId(userId);
    if (!cart) {
      cart = await cartRepository.createCart(userId);
    }    
    let updatedData = {};
    const productAlreadyPresent =
      await cartRepository.getCartItemByUserAndProduct(cart.id, item.productId);

    if (productAlreadyPresent) {
      return await cartRepository.updateCartItem(
        productAlreadyPresent.id,
        item.quantity
      );
    }

    updatedData = {
      price: parseFloat(item.price).toFixed(2),
      quantity: Number(item.quantity),
      cart: { connect: { id: cart.id } },
      product: { connect: { id: item.productId } },
    };

    return await cartRepository.addCartItem(updatedData);
  } catch (error) {
    console.error("Error in addItemToCart:", error);
    throw error;
  }
};

exports.updateItemQuantity = async (productId, newQuantity) => {
  try {
    return await cartRepository.updateItemQuantityById(productId, newQuantity);
  } catch (error) {
    throw error;
  }
};

exports.deleteItem = async (id) => {
  try {
    return await cartRepository.deleteCartItem(id);
  } catch (error) {
    throw error;
  }
};

exports.removeAllItems = async (userId) => {
  try {
    const cart = await cartRepository.getCartByUserId(userId);
    return await cartRepository.deleteAllCartItems(cart.id);
  } catch (error) {
    throw error;
  }
};
