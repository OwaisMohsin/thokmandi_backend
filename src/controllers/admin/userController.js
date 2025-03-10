const asyncHandler = require("../../utils/asyncHandler");
const userService = require("../../services/userService/userService");

exports.fetchAllBuyers = asyncHandler(async (req, res) => {
  const buyers = await userService.getAllBuyers();
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

exports.toggelProfileStatus = asyncHandler(async (req, res) => {
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
