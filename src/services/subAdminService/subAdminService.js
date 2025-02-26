const subAdminRepository = require("../../repositories/subAdminRepository/subAdminRepository");
const AppError = require("../../utils/AppError");

exports.createSubAdmin = async (data) => {
  try {
    return await subAdminRepository.createSubAdmin(data);
  } catch (error) {
    throw error;
  }
};

exports.getAllSubAdmins = async (req, res) => {
  try {
    const subAdmins = await subAdminRepository.getAllSubAdmins();
    if (subAdmins && subAdmins.length > 0) {
      return subAdmins;
    } else {
      throw new AppError("No sub admins found", 404);
    }
  } catch (error) {
    throw error;
  }
};

exports.updateSubAdmin = async (id, data) => {
  try {
    const subAdmin = await subAdminRepository.getSubAdminById(id);
    if (!subAdmin) {
      throw new AppError("No sub-admin exist with provided ID", 404);
    }
    const updatedSubAdmin = await subAdminRepository.updateSubAdmin(id, data);
    return updatedSubAdmin;
  } catch (error) {
    throw error;
  }
};

exports.deleteSubAdmin = async (id) => {
  try {
    const subAdmin = subAdminRepository.getSubAdminById(id);
    if (!subAdmin) {
      throw new AppError("No sub-admin exist with provided ID", 404);
    }
    return await subAdminRepository.deleteSubAdmin(id);
  } catch (error) {
    throw error;
  }
};
