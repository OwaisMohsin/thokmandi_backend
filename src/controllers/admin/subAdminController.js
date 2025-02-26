const asyncHandler = require("../../utils/asyncHandler");
const {
  validateSubAdminData,
} = require("../../services/subAdminService/subAdminValidation");
const {
  createSubAdmin,
} = require("../../services/subAdminService/subAdminService");

exports.addSubAdmin = asyncHandler(async (req, res) => {
  validateSubAdminData(req.body);
  const subAdmin = await subAdminService.createSubAdmin(req.body);
  return res.status(201).json({
    status: true,
    message: "Sub amdin created successfully",
    data: { subAdmin },
  });
});

exports.getSubAdmins = asyncHandler(async (req, res) => {
  const subAdmins = await subAdminService.getAllSubAdmins();
  return res.status(200).json({
    status: true,
    message: "Sub admins fetch successfully",
    data: { subAdmins },
  });
});

exports.updateSubAdmin = asyncHandler(async (req, res) => {
  const updatedSubAdmin = await subAdminService.updateSubAdmin(id, data);
  return res.status(200).json({
    status: true,
    message: "Sub admin updated successfully",
    data: { subAdmin: updatedSubAdmin },
  });
});

exports.deleteSubAdmin = asyncHandler(async (req, res) => {
  await subAdminService.deleteSubAdmin(id);
  return res
    .status(200)
    .json({ status: true, message: "Sub admin deleted successfully" });
});
