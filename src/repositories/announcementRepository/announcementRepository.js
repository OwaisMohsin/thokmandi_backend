const { Role } = require("@prisma/client");
const prisma = require("../../config/db");

exports.fetchAllAnnouncements = async (vendorId) => {
  return await prisma.announcement.findMany({
    where: {
      OR: [
        {
          AND: [{ createdBy: Role.VENDOR }, { vendorId: Number(vendorId) }],
        },
        {
          createdBy: Role.ADMIN,
        },
      ],
    },
  });
};

exports.createAnnouncement = async (data) => {
  return await prisma.announcement.create({ data });
};

exports.getAnnouncementById = async (id) => {
  return await prisma.announcement.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.updateAnnouncement = async (id, data) => {
  return await prisma.announcement.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.deleteAnnouncement = async (id) => {
  return await prisma.announcement.delete({
    where: {
      id: Number(id),
    },
  });
};
