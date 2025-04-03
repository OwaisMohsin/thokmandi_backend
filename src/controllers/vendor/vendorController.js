const asyncHandler = require("../../utils/asyncHandler");
const vendorService = require("../../services/vendorService/vendorService");

exports.vendorRegistration = asyncHandler(async (req, res) => {
  const vendor = await vendorService.registerVendor(req.body, req);
  return res.status(201).json({
    status: true,
    message: "Vendor profile created successfully",
    data: { user: vendor },
  });
});

exports.getVendorById = asyncHandler(async (req, res) => {
  const vendorId = req.params.vendorId;
  const vendor = await vendorService.fetchVendorById(vendorId);
  return res
    .status(200)
    .json({ status: true, message: "Vendor data found", data: { vendor } });
});
