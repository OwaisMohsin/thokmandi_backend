const asyncHandler = require("../../utils/asyncHandler");
const vendorService = require("../../services/vendorService/vendorService");

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


exports.updateRequestStatus = asyncHandler(async (req,res) => {
    const requestId = req.params.requestId;
    const updatedRequest = await vendorService.changeRequestStatus(requestId)
})
