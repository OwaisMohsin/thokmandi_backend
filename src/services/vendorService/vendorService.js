const { Role } = require("@prisma/client");
const userRepository = require("../../repositories/UserRepository/userRepository");
const vendorRepository = require("../../repositories/vendorRepository/vendorRepository");
const authService = require("../authService/authService");
const AppError = require("../../utils/AppError");

exports.registerVendor = async (data,req) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    shopName,
    storeUrl,
    street,
    apartment,
    city,
    zipCode,
    state,
    country,
    province,
    storePhoneNumber,
  } = data;

  const userData = { firstName, lastName, email, password };
  const address = {
    street,
    state,
    apartment,
    city,
    zipCode,
    country,
    province,
  };

  try {
    let user = await userRepository.findUserByEmail(email);

    if (!user) {
      user = await authService.registerUser(userData,req);
    }

    const storeData = {
      ...address,
      storeName: shopName,
      storeUrl,
      phoneNumber,
      user: { connect: { id: user.id } },
    };

    const store = await vendorRepository.createStore(storeData);

    const admin = await userRepository.getUserByRole(Role.ADMIN);
    if(!admin){
      throw new AppError("There is no admin os system",404);
    }
    if (!admin.isApprovalRequired) {
      await userRepository.updateUserById(user.id, { role: Role.VENDOR });
      await vendorRepository.updateStoreStatus(store.id, {
        storeStatus: "accepted",
      });
    }

    const result = await userRepository.findUserById(user.id);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.vendorRequests = async () => {
  try {
    return await vendorRepository.getAllVendorRequests();
  } catch (error) {
    throw error;
  }
};

exports.changeRequestStatus = async (id, data) => {
  try {
    const store = await vendorRepository.getStoreById(id);
    if (!store) {
      throw new AppError("No store found with provided Id", 404);
    }

    if (data.storeStatus === "accepted") {
      await userRepository.updateUserById(store.vendorId, {
        role: Role.VENDOR,
      });
    } else {
      await userRepository.updateUserById(store.vendorId, { role: Role.BUYER });
    }
    return await vendorRepository.updateStoreStatus(id, data);
  } catch (error) {
    throw error;
  }
};

exports.deleteStoreRequest = async (id) => {
  try {
    const store = await vendorRepository.getStoreById(id);
    if (!store) {
      throw new AppError("No store found with provided Id", 404);
    }
    return await vendorRepository.deleteStoreById(id);
  } catch (error) {
    throw error;
  }
};
