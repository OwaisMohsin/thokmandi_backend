const userRepositoy = require("../../repositories/UserRepository/userRepository");
const sendEmail = require("../../utils/email");
const { createToken } = require("../../utils/createJwtToken");
const { generateRandomToken } = require("../../utils/generateRandomToken");
const AppError = require("../../utils/AppError");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.registerUser = async (data, req) => {
  try {
    const { firstName, lastName, email, password } = data;
    const userFound = await userRepositoy.findUserByEmail(email);
    if (userFound) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const user = await userRepositoy.createUser(userData);

    // Generate verification token
    const verificationToken = await generateRandomToken();
    await userRepositoy.updateUserById(user.id, {
      verificationToken: verificationToken.hashedToken,
    });

    // const baseUrl = `${req.protocol}://${req.get("host")}`;
    // const verificationUrl = `${baseUrl}/api/v1/auth/verify/${verificationToken.plainToken}`;
    const verificationUrl = `http://192.168.18.5:3000/verify-account/${verificationToken.plainToken}`;

    const subject = "Account Verification";
    const message = `
      <p>Welcome!</p>
      <p>Please verify your account by clicking the link below:</p>
      <p><a href="${verificationUrl}" style="color: #007bff; text-decoration: none; font-weight: bold;">Verify Account</a></p>
      <p>If you did not sign up for this account, please ignore this message.</p>
    `;

    await sendEmail({
      email: data.email,
      message,
      subject,
      verificationToken: verificationToken.plainToken,
    });

    const token = createToken(user.id);
    const { password: _, ...safeUser } = { ...user, token };
    return safeUser;
  } catch (error) {
    throw error;
  }
};

exports.loginUser = async (data) => {
  try {
    const { email, password } = data;

    const user = await userRepositoy.findUserByEmail(email);
    if (!user) {
      throw new AppError("No user found with provided EMAIL", 404);
    }

    const userStatus = user.isActive;
    if (!userStatus) {
      throw new AppError("Profile is blocked", 403);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError("Invalid email or password", 400);
    }
    const token = createToken(user.id);
    const { password: _, ...safeUser } = { ...user, token };
    return safeUser;
  } catch (error) {
    throw error;
  }
};

exports.verifyUser = async (plainToken, requestType) => {
  if (!plainToken) {
    throw new AppError("Token is missing from URL", 400);
  }

  console.log("Token is",plainToken);
  

  const hashedToken = crypto
    .createHash("sha256")
    .update(plainToken)
    .digest("hex");

  const user = await userRepositoy.findUserByHashedToken(hashedToken);

  if (!user) {
    throw new AppError("No user found with provided token", 404);
  }

  await userRepositoy.updateUserById(user.id, {
    isVerified: true,
    verificationToken: null,
  });

  if (requestType === "forgot-password") {
    return {
      type: "redirect",
      url: `http://192.168.18.48:3000/my-account/lost-password/email-verified/${plainToken}`,
    };
  }

  return { type: "render", view: "verification-success" };
};

exports.userForgotPassword = async (data, req) => {
  try {
    const email = data.email;

    const user = await userRepositoy.findUserByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const verificationToken = await generateRandomToken();
    await userRepositoy.updateUserById(user.id, {
      verificationToken: verificationToken.hashedToken,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const verificationUrl = `${baseUrl}/api/v1/auth/verify/${verificationToken.plainToken}?type=forgot-password`;

    const subject = "Password Reset";
    const message = `
      <p>Welcome!</p>
      <p>Please verify your account by clicking the link below:</p>
     <p>${verificationUrl}</p>

      <p>If you did not sign up for this account, please ignore this message.</p>
    `;

    await sendEmail({
      email: data.email,
      message,
      subject,
      verificationToken: verificationToken.plainToken,
    });
  } catch (error) {
    throw error;
  }
};

exports.userResetPassword = async (data) => {
  try {
    const { email, password } = data;
    const user = await userRepositoy.findUserByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepositoy.updateUserById(user.id, {
      password: hashedPassword,
      verificationToken: null,
    });
  } catch (error) {
    throw error;
  }
};
