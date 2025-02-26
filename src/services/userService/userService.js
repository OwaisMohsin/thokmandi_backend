const userRepository = require("../../repositories/UserRepository/userRepository");
const bcrypt = require("bcryptjs");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const prisma = require("../../config/db");

exports.updateUserProfile = async (id, data) => {
  try {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    let updatedData = { ...data };

    if (data.currentPassword !== "" && data.newPassword !== "") {
      const isPasswordMatch = await bcrypt.compare(
        data.currentPassword,
        user.password
      );
      if (!isPasswordMatch) {
        throw new AppError("Current password is invalid", 400);
      }

      updatedData.password = await bcrypt.hash(data.newPassword, 10);
    }
    delete updatedData.currentPassword;
    delete updatedData.newPassword;
    const updatedUser = await userRepository.updateUserById(id, updatedData);
    const { password: _, ...safeUser } = { ...updatedUser };
    return safeUser;
  } catch (error) {
    throw error;
  }
};

exports.addUserAddress = async (userId, data) => {
  try {
    const updatedData = { ...data, user: { connect: { id: userId } } };

    return await userRepository.addUserAddress(updatedData);
  } catch (error) {
    throw error;
  }
};

exports.getUserAddresses = async (id) => {
  try {
    return await userRepository.getUserAddresses(id);
  } catch (error) {
    throw error;
  }
};

exports.editUserAddress = async (userId,addressId,data) => {
  try {
    console.log("serivcw is called.....");
    
    const address = await userRepository.getAddressById(addressId);
    if(!address){
      throw new AppError("No address found with provided id",404);
    }
    console.log("address is ", data);
    
    return await userRepository.updateAddress(userId,addressId, data);
  } catch (error) {
    throw error;
  }
};
