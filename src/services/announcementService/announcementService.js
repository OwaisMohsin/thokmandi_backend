const { Role } = require("@prisma/client");
const announcementRepository = require("../../repositories/announcementRepository/announcementRepository");
const AppError = require("../../utils/AppError");

exports.getAnnouncements = async (vendorId) => {
  try {
    return await announcementRepository.fetchAllAnnouncements(vendorId);
  } catch (error) {
    throw error;
  }
};

exports.createNewAnnouncement = async (vendorId, userRole, data) => {
  try {
    const announcementData = {
      ...data,
      createdBy: userRole,
      ...(userRole === Role.VENDOR && {
        vendor: { connect: { id: Number(vendorId) } },
      }),
    };
    return await announcementRepository.createAnnouncement(announcementData);
  } catch (error) {
    throw error;
  }
};

exports.updateSingleAnnouncement = async (id, vendorId, userRole, data) => {
  try {
    const announcement = await announcementRepository.getAnnouncementById(id);
    if (!announcement) {
      throw new AppError("No announcement found with provided ID", 404);
    }

    if (userRole === Role.ADMIN) {
      return await announcementRepository.updateAnnouncement(id, data);
    }

    if (userRole === Role.VENDOR) {
      if (
        announcement.createdBy === Role.VENDOR &&
        announcement.vendorId === Number(vendorId)
      ) {
        return await announcementRepository.updateAnnouncement(id, data);
      }
    }

    throw new AppError(
      "You don't have permission to update this announcement",
      403
    );
  } catch (error) {
    throw error;
  }
};

exports.deleteSingleAnnouncement = async (
  announcementId,
  vendorId,
  userRole
) => {
  try {
    const announcement = await announcementRepository.getAnnouncementById(
      announcementId
    );
    if (!announcement) {
      throw new AppError("No announcement found with provided ID", 404);
    }
    if (userRole === Role.ADMIN) {
      return await announcementRepository.deleteAnnouncement(announcementId);
    }

    if (userRole === Role.VENDOR) {
      if (
        announcement.createdBy === Role.VENDOR &&
        announcement.vendorId === Number(vendorId)
      ) {
        return await announcementRepository.deleteAnnouncement(announcementId);
      }
    }

    throw new AppError(
      "You don't have permission to delete this announcement",
      403
    );
  } catch (error) {
    throw error;
  }
};
