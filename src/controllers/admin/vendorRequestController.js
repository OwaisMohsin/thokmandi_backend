const asyncHandler = require("../../utils/asyncHandler");
const vendorService = require("../../services/vendorService/vendorService");
const userService = require("../../services/userService/userService");

exports.getVendorRequests = asyncHandler(async (req, res) => {
  const requests = await vendorService.vendorRequests();

  if (requests && requests.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Requests found",
      data: { requests },
    });
  }
  return res
    .status(200)
    .json({ status: true, message: "No Data Found", data: { requests: [] } });
});

exports.updateRequestStatus = asyncHandler(async (req, res) => {
  const data = req.body;
  const storeId = req.params.storeId;

  const updated = await vendorService.changeRequestStatus(storeId, data);

  return res.status(200).json({
    status: true,
    message: "Status updated successfully",
    data: { updated },
  });
});

exports.deleteRequest = asyncHandler(async (req, res) => {
  const storeId = req.params.storeId;
  await vendorService.deleteStoreRequest(storeId);
  return res
    .status(200)
    .json({ status: true, message: "Reqeust deleted successfully" });
});

exports.updateApprovalStatus = asyncHandler(async (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  const user = await userService.updateRequestApprovalStatus(userId, data);
  return res
    .status(200)
    .json({ status: true, message: "Approval status updated", data: { user } });
});
