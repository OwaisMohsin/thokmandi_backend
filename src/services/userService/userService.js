const userRepository = require("../../repositories/UserRepository/userRepository");
const bcrypt = require("bcryptjs");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const prisma = require("../../config/db");

exports.getUserProfile = async (userId) => {
  try {
    return await userRepository.findUserById(userId);
  } catch (error) {
    throw error;
  }
};

exports.updateUserProfile = async (id, data) => {
  try {
    console.log("Data is", data);
    
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

exports.editUserAddress = async (userId, addressId, data) => {
  try {
    const address = await userRepository.getAddressById(addressId);
    if (!address) {
      throw new AppError("No address found with provided id", 404);
    }

    return await userRepository.updateAddress(userId, addressId, data);
  } catch (error) {
    throw error;
  }
};

exports.updateUserStatus = async (id, data) => {
  try {
    const user = await userRepository.changeStatus(id, data);
    const { password: _, ...safeUser } = { ...user };
    return safeUser;
  } catch (error) {
    throw error;
  }
};

exports.updateRequestApprovalStatus = async (id, data) => {
  try {
    const user = await userRepository.changeApprovalStatus(id, data);
    const { password: _, ...safeUser } = { ...user };
    return safeUser;
  } catch (error) {
    throw error;
  }
};

exports.getAllBuyers = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    return await userRepository.fetchAllBuyers(skip, limit);
  } catch (error) {
    throw error;
  }
};

exports.searchBuyerByEmail = async (data) => {
  try {
    return await userRepository.getBuyerByEmail(data.keyword);
  } catch (error) {
    throw error;
  }
};

exports.fetchBuyersCount = async () => {
  try {
    return await userRepository.countBuyers();
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (id) => {
  try {
    return await userRepository.deleteUserById(id);
  } catch (error) {
    throw error;
  }
};
