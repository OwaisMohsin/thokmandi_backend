const asyncHandler = require("../../utils/asyncHandler");
const vendorService = require("../../services/vendorService/vendorService");

exports.vendorRegistration = asyncHandler(async (req, res) => {
  const vendor = await vendorService.registerVendor(req.body);
  return res
    .status(201)
    .json({
      status: true,
      message: "Vendor profile created successfully",
      data: { user: vendor },
    });
});
