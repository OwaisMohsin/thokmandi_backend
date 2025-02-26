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
  const address = await userService.addUserAddress(userId,req.body);
  return res
    .status(201)
    .json({
      status: true,
      message: "Address created succesffuly!",
      data: { address },
    }); 
});


exports.editAddress = asyncHandler(async (req,res) => {
  validateAddressData(req.body);
  const userId = req.user.id;
  const updatedAddress = await userService.editUserAddress(userId,req.body);

})
