const prisma = require("../../config/db");

exports.findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

exports.findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

exports.findUserByHashedToken = async (hashedToken) => {
  return prisma.user.findFirst({
    where: {
      verificationToken: hashedToken,
    },
  });
};

exports.createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

exports.updateUserById = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

exports.addUserAddress = async (data) => {
  return await prisma.address.create({
    data,
  });
};

exports.editUserAddress = async (userId, data) => {
  return await prisma.address.update({
    where: {
      userId,
    },
    data,
  });
};
