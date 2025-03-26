const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {fetchAllBuyers,getBuyersCount,searchBuyer,toggleProfileStatus,deleteUser} = require('../../controllers/admin/userController');


// variable initializations
const router = express.Router();


router
    .route("/users")
    .get(checkRequest,fetchAllBuyers);

router
    .route('/user/buyers/count')
    .get(checkRequest,getBuyersCount);   
    
router
    .route('/user/buyer/search')
    .post(checkRequest,searchBuyer)    

router
    .route('/user/toggle-status/:userId')
    .patch(checkRequest,toggleProfileStatus);
    
router
    .route('/user/delete/:userId')
    .delete(checkRequest,deleteUser);      



 

module.exports = router;