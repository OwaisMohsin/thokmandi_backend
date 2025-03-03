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
    shopName,
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
      storeName: shopName,
      storeUrl,
      storePhoneNumber,
      user: { connect: { id: user.id } },
    };

    const store = await vendorRepository.createStore(storeData);

    const storeAddress = await vendorRepository.addAddress({
      ...address,
      phoneNumber: "",
      addressType: "store",
      user: { connect: { id: user.id } },
      store: { connect: { id: store.id } },
    });

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
