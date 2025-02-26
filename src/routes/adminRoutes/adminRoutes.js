// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {addSubAdmin, getSubAdmins, updateSubAdmin, deleteSubAdmin} = require('../../controllers/admin/subAdminController');



// variable initializations
const router = express.Router();


router
    .route('/sub-admin')
    .get(checkRequest,getSubAdmins);
    

router
    .route('/sub-admin/create')
    .post(checkRequest,addSubAdmin);



router
    .route('/sub-admin/update/:subAdminId')
    .put(checkRequest,updateSubAdmin);

    
router
    .route('/sub-admin/delete/:subAdminId')
    .delete(checkRequest,deleteSubAdmin);      

module.exports = router;
