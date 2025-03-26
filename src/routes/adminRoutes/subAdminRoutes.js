// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {addSubAdmin, getSubAdmins,getSubAdminsCount, updateSubAdmin,searchSubAdmin, deleteSubAdmin} = require('../../controllers/admin/subAdminController');



// variable initializations
const router = express.Router();


router
    .route('/sub-admin')
    .get(checkRequest,getSubAdmins);

router
    .route('/sub-admin/count')
    .get(checkRequest,getSubAdminsCount); 

router
    .route('/sub-admin/search')
    .post(checkRequest,searchSubAdmin);
    

router
    .route('/sub-admin')
    .post(checkRequest,addSubAdmin);



router
    .route('/sub-admin/:subAdminId')
    .put(checkRequest,updateSubAdmin);

    
router
    .route('/sub-admin/:subAdminId')
    .delete(checkRequest,deleteSubAdmin);      

module.exports = router;
