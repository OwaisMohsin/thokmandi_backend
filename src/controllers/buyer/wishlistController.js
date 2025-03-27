const asyncHandler = require("../../utils/asyncHandler");
const wishlistService = require("../../services/wishlistService/wishlistService");

exports.addItemToWishlist = asyncHandler(async (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  const item = await wishlistService.addItem(userId, data);
  return res.status(201).json({
    status: true,
    message: "Item saved in wishlist successfully",
    data: { item },
  });
});

exports.getUserWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const items = await wishlistService.getItems(userId);
  if (items && items.length > 0) {
    return res.status(200).json({
      status: true,
      message: "items fetch successfully",
      data: { items },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No items found",
    data: { items: [] },
  });
});

exports.deleteWishlistItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;
  await wishlistService.deleteItem(userId,itemId);
  return res
    .status(200)
    .json({ status: true, message: "Wishlist item deleted successfully" });
});
