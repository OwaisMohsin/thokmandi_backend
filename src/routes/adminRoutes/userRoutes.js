const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {fetchAllBuyers,toggelProfileStatus,deleteUser} = require('../../controllers/admin/userController');


// variable initializations
const router = express.Router();


router
    .route("/users")
    .get(checkRequest,fetchAllBuyers);

router
    .route('/user/toggle-status/:userId')
    .patch(checkRequest,toggelProfileStatus);
    
router
    .route('/user/delete/:userId')
    .delete(checkRequest,deleteUser);      



 

module.exports = router;