const { Role } = require("@prisma/client");
const prisma = require("../../config/db");

exports.findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      address: true,
      store: true,
    },
  });
};

exports.findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      address: true,
      store: true,
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
      id: Number(id),
    },
    data,
  });
};

exports.getUserByRole = async (role) => {
  return await prisma.user.findFirst({
    where: {
      role,
    },
  });
};

exports.getVendorbyId = async (id) => {
  return await prisma.user.findFirst({
    where:{
      id:Number(id),
      role:Role.VENDOR
    },
  })
}

exports.addUserAddress = async (data) => {
  return await prisma.address.create({
    data,
  });
};

exports.getAddressById = async (id) => {
  return await prisma.address.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.getUserAddresses = async (id) => {
  return await prisma.address.findMany({
    where: {
      userId: Number(id),
    },
  });
};

exports.updateAddress = async (userId, addressId, data) => {
  return await prisma.address.update({
    where: {
      id: Number(addressId),
    },
    data,
  });
};

exports.changeApprovalStatus = async (id, data) => {
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.fetchAllBuyers = async () => {
  return await prisma.user.findMany({
    where: {
      role: Role.BUYER,
    },
    orderBy: { createdAt: "desc" },
  });
};

exports.changeStatus = async (id, data) => {
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.deleteUserById = async (id) => {
  return await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
};
