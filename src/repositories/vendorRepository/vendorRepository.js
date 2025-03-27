const { Role } = require("@prisma/client");
const prisma = require("../../config/db");

exports.createStore = async (data) => {
  return await prisma.store.create({
    data,
  });
};

exports.findVendorById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      store: true,
    },
  });
};

exports.fetchVendorRequestByEmail = async (keyword) => {
  return await prisma.store.findMany({
    where: {
      user: {
        email: {
          contains: keyword,
          mode: "insensitive",
        },
        role: Role.VENDOR,
      },
    },
    include: {
      user: true,
    },
  });
};

exports.getStoreById = async (id) => {
  return await prisma.store.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.addAddress = async (data) => {
  return await prisma.address.create({
    data,
  });
};

exports.getAllVendorRequests = async (skip, limit) => {
  return await prisma.store.findMany({
    // where: {
    //   storeStatus: "pending",
    // },
    include: {
      user: {
        include: {
          address: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
};

exports.getAllVendorRequestsCount = async () => {
  return await prisma.store.count({
    where: {
      storeStatus: "pending",
    },
  });
};

exports.updateStoreStatus = async (id, data) => {
  return await prisma.store.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.deleteStoreById = async (id) => {
  return await prisma.store.delete({
    where: {
      id: Number(id),
    },
  });
};
