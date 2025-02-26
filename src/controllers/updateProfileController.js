const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/userService/userService");
const {
  validateUpdateUserProfile,
  validateAddressData,
} = require("../services/userService/userValidation");

exports.updateProfile = asyncHandler(async (req, res) => {
  validateUpdateUserProfile(req.body);
  const updatedProfile = await userService.updateUserProfile(
    req.user.id,
    req.body
  );
  return res.status(201).json({
    status: true,
    message: "User updated successfully",
    data: { user: updatedProfile },
  });
});

exports.addAddress = asyncHandler(async (req, res) => {
  validateAddressData(req.body);
  const userId = req.user.id;
  const address = await userService.addUserAddress(userId, req.body);
  return res.status(201).json({
    status: true,
    message: "Address created succesffuly!",
    data: { address },
  });
});

exports.getAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addresses = await userService.getUserAddresses(userId);
  if (addresses && addresses.length > 0) {
    return res.status(200).json({
      status: true,
      message: "User addresses found",
      data: { addresses },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No User addresses found",
    data: { addresses: [] },
  });
});

exports.editAddress = asyncHandler(async (req, res) => {
  // validateAddressData(req.body);
  const userId = req.user.id;
  const addressId = req.params.id;
  const updatedAddress = await userService.editUserAddress(
    userId,
    addressId,
    req.body
  );
  console.log("update addresss is", updatedAddress);

  return res
    .status(200)
    .json({
      status: true,
      message: "Address updated successfully",
      data: { updatedAddress },
    });
});
