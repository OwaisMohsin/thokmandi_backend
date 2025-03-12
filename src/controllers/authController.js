const authService = require("../services/authService/authService");
const {
  validateUserData,
  validateLoginData,
} = require("../services/authService/authValidation");
const asyncHandler = require("../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  validateUserData(req.body);
  const user = await authService.registerUser(req.body, req);
  if (!user) return;

  return res.status(201).json({
    status: true,
    message: "User registered successfully",
    data: { user },
  });
});

exports.login = asyncHandler(async (req, res) => {
  validateLoginData(req.body);
  const user = await authService.loginUser(req.body);
  if (!user) return;
  return res.status(200).json({
    status: true,
    message: "Logged in successfully",
    data: { user },
  });
});

exports.verify = asyncHandler(async (req, res) => {
  const plainToken = req.params.token;
  const requestType = req.query.type || "";

  const result = await authService.verifyUser(plainToken, requestType);

  if (result.type === "redirect") {
    return res.redirect(result.url);
  }

  return res.status(200).json({
    status: true,
    message: "Verification successful",
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  await authService.userForgotPassword(req.body, req);
  return res
    .status(200)
    .json({ status: true, message: "Email sent successfully" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  validateLoginData(req.body);
  await authService.userResetPassword(req.body);
  return res
    .status(200)
    .json({ status: true, message: "Password updated successfully" });
});


