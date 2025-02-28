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

    const updatedData = {
      price: parseFloat(item.price).toFixed(2), // Ensures two decimal places
      quantity: Number(item.quantity), // Ensures quantity is a valid number
      cart: { connect: { id: cart.id } },
      product: { connect: { id: item.productId } },
    };

    return await cartRepository.addCartItem(updatedData);
  } catch (error) {
    console.error("Error in addItemToCart:", error);
    throw error;
  }
};

exports.deleteItem = async (id) => {
    try {
        return await cartRepository.deleteCartItem(id);
    } catch (error) {
        throw error;
    }
}
