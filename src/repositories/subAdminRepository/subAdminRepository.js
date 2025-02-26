const { Role } = require("@prisma/client");
const prisma = require("../../config/db");

exports.createSubAdmin = async (data) => {
  return await prisma.user.create({
    data,
  });
};

exports.getAllSubAdmins = async () => {
  return await prisma.user.findMany({
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

exports.getSubAdminByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

exports.updateSubAdmin = async (id, data) => {
  return await prisma.user.update({
    where: {
      id:Number(id)
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
