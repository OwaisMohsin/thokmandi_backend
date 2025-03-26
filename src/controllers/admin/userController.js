const asyncHandler = require("../../utils/asyncHandler");
const userService = require("../../services/userService/userService");

exports.fetchAllBuyers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const buyers = await userService.getAllBuyers(page, limit);
  if (buyers && buyers.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Buyers fetch successfully",
      data: { buyers },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No buyers found",
    data: { buyers: [] },
  });
});

exports.getBuyersCount = asyncHandler(async (req, res) => {
  const count = await userService.fetchBuyersCount();
  return res.status(200).json({
    status: true,
    message: "Total count fetched successfully",
    data: { count },
  });
});

exports.searchBuyer = asyncHandler(async (req, res) => {
  const data = req.body;
  const buyer = await userService.searchBuyerByEmail(data);
  if (buyer && buyer.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Buyer fetch successfully",
      data: { buyer },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No sub admin found",
    data: { buyer: [] },
  });
});

exports.toggleProfileStatus = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  const user = await userService.updateUserStatus(userId, data);
  return res.status(200).json({
    status: true,
    message: "User status updated successfully",
    data: { user },
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);
  return res
    .status(200)
    .json({ status: true, message: "User deleted successfully" });
});
