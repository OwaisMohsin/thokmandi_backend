const { Role } = require("@prisma/client");
const prisma = require("../../config/db");

exports.createSubAdmin = async (data) => {
  return await prisma.user.create({
    data,
  });
};

exports.getAllSubAdmins = async (skip, limit) => {
  return await prisma.user.findMany({
    where: {
      role: Role.SUB_ADMIN,
    },
    skip,
    take: limit,
  });
};

exports.countSubAdmins = async () => {
  return await prisma.user.count({
    where: {
      role: Role.SUB_ADMIN,
    },
  });
};

exports.getSubAdminById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.getSubAdminByEmail = async (keyword) => {
  return await prisma.user.findMany({
    where: {
      AND: [
        {
          email: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        { role: Role.SUB_ADMIN },
      ],
    },
    select: {
      firstName: true,
      lastName: true,
      phoneNumber: true,
      isActive: true,
      email: true,
      role:true
    },
  });
};

exports.updateSubAdmin = async (id, data) => {
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.deleteSubAdmin = async (id) => {
  return await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
};
