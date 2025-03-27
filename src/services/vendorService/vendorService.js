const { Role } = require("@prisma/client");
const userRepository = require("../../repositories/UserRepository/userRepository");
const vendorRepository = require("../../repositories/vendorRepository/vendorRepository");
const authService = require("../authService/authService");
const AppError = require("../../utils/AppError");

exports.registerVendor = async (data, req) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    shopName,
    websiteUrl,
    street,
    apartment,
    city,
    zipCode,
    state,
    country,
    companyName,
    companyId,
    taxNumber,
  } = data;

  const userData = { firstName, lastName, email, password, phoneNumber };

  try {
    let user = await userRepository.findUserByEmail(email);

    if (!user) {
      user = await authService.registerUser(userData, req);
    }

    const storeData = {
      shopName,
      websiteUrl,
      street,
      apartment,
      city,
      zipCode,
      country,
      state,
      companyName,
      companyId,
      taxNumber,
      user: { connect: { id: user.id } },
    };

    const store = await vendorRepository.createStore(storeData);

    const admin = await userRepository.getUserByRole(Role.ADMIN);
    if (!admin) {
      throw new AppError(
        "There is no admin to verify your request, add ADMIN first",
        404
      );
    }
    if (!admin.isApprovalRequired) {
      await userRepository.updateUserById(user.id, { role: Role.VENDOR });
      await vendorRepository.updateStoreStatus(store.id, {
        storeStatus: "accepted",
      });
    }

    const result = await userRepository.findUserById(user.id);
    const { password: _, ...safeUser } = { ...result };
    return safeUser;
  } catch (error) {
    throw error;
  }
};

exports.vendorRequests = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    return await vendorRepository.getAllVendorRequests(skip, limit);
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

exports.fetchVendorById = async (vendorId) => {
  try {
    const vendor = await vendorRepository.findVendorById(vendorId);
    if (!vendor) {
      throw new AppError("No vendor found with provided ID", 404);
    }
    return vendor;
  } catch (error) {
    throw error;
  }
};

exports.fetchRequestsCount = async () => {
  try {
    return await vendorRepository.getAllVendorRequestsCount();
  } catch (error) {
    throw error;
  }
};

exports.searchVendorRequestByEmail = async (keyword) => {
  try {
    return await vendorRepository.fetchVendorRequestByEmail(keyword);
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
