const asyncHandler = require("../../utils/asyncHandler");
const cartService = require("../../services/cartService/cartService");

exports.getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await cartService.fetchUserCart(userId);
  return res.status(200).json({
      status: true,
      message: "User cart fetched successfully",
      data: cart ? {cart} : {},
  })
});

exports.addProductToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const item = req.body;

  const cartItem = await cartService.addItemToCart(userId, item);
  return res.status(201).json({
    status: true,
    message: "Item added successfully",
    data: {
      cartItem,
    },
  });
});

exports.updateCartItemQuantity = asyncHandler(async (req, res) => {
  const itemQuantity = req.body.quantity;
  const itemId = req.params.itemId;

  const cartItem = await cartService.updateItemQuantity(itemId, itemQuantity);

  return res.status(201).json({
    status: true,
    message: "Item added successfully",
    data: {
      cartItem,
    },
  });
});

exports.deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;
  await cartService.deleteItem(itemId);

  return res.status(200).json({
    status: true,
    message: "Item deleted successfully",
  });
});

exports.deleteAllItems = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await cartService.removeAllItems(userId);
  return res.status(200).json({
    status: true,
    message: "Cart Items deleted successfully",
  });
});
