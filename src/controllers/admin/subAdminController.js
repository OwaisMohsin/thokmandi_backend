const asyncHandler = require("../../utils/asyncHandler");
const {
  validateSubAdminData,
} = require("../../services/subAdminService/subAdminValidation");

const subAdminService = require("../../services/subAdminService/subAdminService");

exports.addSubAdmin = asyncHandler(async (req, res) => {
  // validateSubAdminData(req.body);
  const subAdmin = await subAdminService.createSubAdmin(req.body);
  return res.status(201).json({
    status: true,
    message: "Sub admin created successfully",
    data: { subAdmin },
  });
});

exports.getSubAdmins = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const subAdmins = await subAdminService.getAllSubAdmins(page, limit);

  if (subAdmins && subAdmins.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Sub admins fetch successfully",
      data: { subAdmins },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No sub admin found",
    data: { subAdmins: [] },
  });
});

exports.getSubAdminsCount = asyncHandler(async (req, res) => {
  const count = await subAdminService.fetchSubAdminsCount();
  return res.status(200).json({
    status: true,
    message: "Total count fetched successfully",
    data: { count },
  });
});

exports.updateSubAdmin = asyncHandler(async (req, res) => {
  const id = req.params.subAdminId;

  const updatedSubAdmin = await subAdminService.updateSubAdmin(
    id,
    req.body.data
  );
  return res.status(200).json({
    status: true,
    message: "Sub admin updated successfully",
    data: { subAdmin: updatedSubAdmin },
  });
});

exports.deleteSubAdmin = asyncHandler(async (req, res) => {
  const id = req.params.subAdminId;
  await subAdminService.deleteSubAdmin(id);
  return res
    .status(200)
    .json({ status: true, message: "Sub admin deleted successfully" });
});
