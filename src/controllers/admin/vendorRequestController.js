const asyncHandler = require("../../utils/asyncHandler");
const vendorService = require("../../services/vendorService/vendorService");
const userService = require("../../services/userService/userService");

exports.getVendorRequests = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const requests = await vendorService.vendorRequests(page, limit);

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

exports.getVendorRequestByVendorEmail = asyncHandler(async (req, res) => {
  const data = req.body;
  const vendorRequest = await vendorService.searchVendorRequestByEmail(data.keyword);
  if (vendorRequest && vendorRequest.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Vendor Request fetch successfully",
      data: { vendorRequest },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No vendor request found",
    data: { vendorRequest: [] },
  });
});

exports.getVendorRequestsCount = asyncHandler(async (req, res) => {
  const count = await vendorService.fetchRequestsCount();
  return res.status(200).json({
    status: true,
    message: "Total count fetched successfully",
    data: { count },
  });
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
    .json({ status: true, message: "Request deleted successfully" });
});

exports.updateApprovalStatus = asyncHandler(async (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  const user = await userService.updateRequestApprovalStatus(userId, data);
  return res
    .status(200)
    .json({ status: true, message: "Approval status updated", data: { user } });
});
