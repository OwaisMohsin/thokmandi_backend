const asyncHandler = require("../../utils/asyncHandler");
const cartService = require("../../services/cartService/cartService");

exports.getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await cartService.fetchUserCart(userId);

  if (cart) {
    return res.status(200).json({
      status: true,
      message: "User cart fetched successfully",
      data: { cart },
    });
  }
  return res.status(200).json({
    status: true,
    message: "User cart fetched successfully",
    data: [],
  });
});

exports.addProductToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const item = req.body;
  console.log("Ite is ", item);

  const cartItem = await cartService.addItemToCart(userId, item);
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
  const cart = cartService.fetchUserCart(userId);
  console.log("Cart is ", cart);
  
  return res.status(200).json({
    status: true,
    message: "Item deleted successfully",
    data: { cart },
  });
});
