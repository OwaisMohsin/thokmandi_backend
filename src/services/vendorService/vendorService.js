const { Role } = require("@prisma/client");
const userRepository = require("../../repositories/UserRepository/userRepository");
const vendorRepository = require("../../repositories/vendorRepository/vendorRepository");
const authService = require("../authService/authService");

exports.registerVendor = async (data) => {
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
    country,
    province,
    storePhoneNumber,
  } = data;

  const userData = { firstName, lastName, email, password };
  const address = {
    street,
    apartment,
    city,
    zipCode,
    country,
    province,
  };

  try {
    let user = await userRepository.findUserByEmail(email);

    if (!user) {
      user = await authService.registerUser(userData);
    }

    const storeData = {
      ...address,
      storeName: shopName,
      storeUrl,
      storePhoneNumber,
      user: { connect: { id: user.id } },
    };

    const store = await vendorRepository.createStore(storeData);



    await userRepository.updateUserById(user.id, { role: Role.VENDOR });

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


exports.changeRequestStatus = async (id,data) => {
  try {
    
  } catch (error) {
    
  }
}
