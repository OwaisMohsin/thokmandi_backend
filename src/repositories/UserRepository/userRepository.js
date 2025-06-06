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

exports.getBuyerByEmail = async (keyword) => {
  return await prisma.user.findMany({
    where: {
      AND: [
        {
          email: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        { role: Role.BUYER },
      ],
    },
    select: {
      firstName: true,
      lastName: true,
      phoneNumber: true,
      isActive: true,
      email: true,
      role: true,
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

exports.getVendorById = async (id) => {
  return await prisma.user.findFirst({
    where: {
      id: Number(id),
      role: Role.VENDOR,
    },
  });
};

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

exports.fetchAllBuyers = async (skip, limit) => {
  return await prisma.user.findMany({
    where: {
      role: Role.BUYER,
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
};

exports.countBuyers = async () => {
  return await prisma.user.count({
    where: {
      role: Role.BUYER,
    },
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
