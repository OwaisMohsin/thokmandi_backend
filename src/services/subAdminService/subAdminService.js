const subAdminRepository = require("../../repositories/subAdminRepository/subAdminRepository");
const AppError = require("../../utils/AppError");
const bcrypt = require("bcryptjs");

exports.createSubAdmin = async (data) => {
  try {
    const subAdmin = await subAdminRepository.getSubAdminByEmail(data.email);
    if (subAdmin) {
      throw new AppError("Email already in use", 409);
    }
    const { password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedData = { ...data, isVerified: true, password: hashedPassword };
    return await subAdminRepository.createSubAdmin(updatedData);
  } catch (error) {
    throw error;
  }
};

exports.getAllSubAdmins = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const subAdmins = await subAdminRepository.getAllSubAdmins(skip, limit);
    return subAdmins;
  } catch (error) {
    throw error;
  }
};

exports.fetchSubAdminsCount = async () => {
  try {
    return await subAdminRepository.countSubAdmins();
  } catch (error) {
    throw error;
  }
};

exports.searchSubAdminByEmail = async (data) => {
  try {
    return await subAdminRepository.getSubAdminByEmail(data.keyword);
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
