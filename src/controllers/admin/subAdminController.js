const asyncHandler = require("../../utils/asyncHandler");
const {
  validateSubAdminData,
} = require("../../services/subAdminService/subAdminValidation");

const subAdminService = require("../../services/subAdminService/subAdminService");

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
  if(subAdmins && subAdmins.length > 0){
    return res.status(200).json({
      status: true,
      message: "Sub admins fetch successfully",
      data: { subAdmins },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No sub admin found",
    data: { subAdmins:[] },
  });
});

exports.updateSubAdmin = asyncHandler(async (req, res) => {
  const id = req.params.subAdminId
  
  const updatedSubAdmin = await subAdminService.updateSubAdmin(id, req.body.data);
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
