const asyncHandler = require("../../utils/asyncHandler");
const announcementService = require("../../services/announcementService/announcementService");

exports.getAllAnnouncements = asyncHandler(async (req, res) => {
  const vendorId = req.user.id;
  const announcements = await announcementService.getAnnouncements(vendorId);
  if (announcements && announcements.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Announcements fetch successfully",
      data: { announcements },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No announcements found",
    data: { announcements: [] },
  });
});

exports.createAnnouncement = asyncHandler(async (req, res) => {
  const vendorId = req.user.id;
  const userRole = req.user.role;
  const data = req.body;
  const announcement = await announcementService.createNewAnnouncement(
    vendorId,
    userRole,
    data
  );
  return res.status(201).json({
    status: true,
    message: "Announcement created successfully",
    data: { announcement },
  });
});

exports.updateAnnouncement = asyncHandler(async (req, res) => {
  const announcementId = req.params.announcementId;
  const vendorId = req.user.id;
  const userRole = req.user.role;
  const data = req.body;
  const announcement = await announcementService.updateSingleAnnouncement(
    announcementId,
    vendorId,
    userRole,
    data
  );
  return res.status(200).json({
    status: true,
    message: "Announcement updated successfully",
    data: { announcement },
  });
});

exports.deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcementId = req.params.announcementId;
  const vendorId = req.user.id;

  const userRole = req.user.role;
  await announcementService.deleteSingleAnnouncement(announcementId,vendorId, userRole);
  return res
    .status(200)
    .json({ status: true, message: "Announcement deleted successfully" });
});
