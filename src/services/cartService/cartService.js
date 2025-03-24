const cartRepository = require("../../repositories/cartRepository/cartRepository");
const productRepository = require("../../repositories/productRepository/productRepository");
const AppError = require("../../utils/AppError");

exports.fetchUserCart = async (userId) => {
  try {
    return await cartRepository.getUserCart(userId);
  } catch (error) {
    throw error;
  }
};

exports.addItemToCart = async (userId, item) => {
  try {
    // Get or create cart
    let cart = await cartRepository.getCartByUserId(userId);
    if (!cart) {
      cart = await cartRepository.createCart(userId);
    }

    // First, get product details to check for purchase limit
    const product = await productRepository.findProductById(item.productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    // Check if product is already in cart
    const productAlreadyInCart =
      await cartRepository.getCartItemByUserAndProduct(cart.id, item.productId);

    // Handle product with purchase limit
    if (product.limitOnePerOrder) {
      // If trying to add more than 1 quantity
      if (item.quantity > 1) {
        throw new AppError(
          "This product is limited to one per order by the vendor",
          400
        );
      }

      // If product already exists in cart
      if (productAlreadyInCart) {
        throw new AppError(
          "This product is already in your cart and is limited to one per order",
          400
        );
      }
    }

    // If product is already in cart, update quantity
    if (productAlreadyInCart) {
      return await cartRepository.updateCartItem(
        productAlreadyInCart.id,
        item.quantity
      );
    }

    // Add new item to cart
    const updatedData = {
      price: parseFloat(item.price).toFixed(2),
      quantity: Number(item.quantity),
      cart: { connect: { id: cart.id } },
      product: { connect: { id: item.productId } },
    };

    return await cartRepository.addCartItem(updatedData);
  } catch (error) {
    throw error;
  }
};

exports.updateItemQuantity = async (productId, newQuantity) => {
  try {
    const cartItem = await cartRepository.getCartItemById(productId);
    if (!cartItem) {
      throw new AppError("No Cart item found with provided ID", 404);
    }

    const product = await productRepository.checkPurchaseLimit(
      cartItem.productId
    );

    if (product.limitOnePerOrder) {
      throw new AppError(
        "This product is limited to one per order. You cannot add more than one unit.",
        400
      );
    }
    return await cartRepository.updateItemQuantityById(productId, newQuantity);
  } catch (error) {
    throw error;
  }
};

exports.deleteItem = async (id) => {
  try {
    const cartItem = cartRepository.getCartItemById(id);
    if (!cartItem) {
      throw new AppError("Cart item not found with provided ID", 404);
    }
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
