const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllVendorAnnouncements,createAnnouncement,updateAnnouncement,deleteAnnouncement} = require('../../controllers/vendor/announcementController');


// variable initializations
const router = express.Router();


router
    .route("/vendor/announcement")
    .get(checkRequest,getAllVendorAnnouncements);

router
    .route('/vendor/announcement')
    .post(checkRequest, createAnnouncement);

router
    .route('/vendor/announcement/:announcementId')
    .patch(checkRequest, updateAnnouncement); 
    
router
    .route('/vendor/announcement/:announcementId')
    .delete(checkRequest, deleteAnnouncement);     



module.exports = router;