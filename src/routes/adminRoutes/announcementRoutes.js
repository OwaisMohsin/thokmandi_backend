const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllAnnouncements,createAnnouncement,updateAnnouncement,deleteAnnouncement} = require('../../controllers/admin/announcementController');


// variable initializations
const router = express.Router();


router
    .route("/admin/announcement")
    .get(checkRequest,getAllAnnouncements);

router
    .route('/admin/announcement')
    .post(checkRequest, createAnnouncement);

router
    .route('/admin/announcement/:announcementId')
    .patch(checkRequest, updateAnnouncement); 
    
router
    .route('/admin/announcement/:announcementId')
    .delete(checkRequest, deleteAnnouncement);     



module.exports = router;