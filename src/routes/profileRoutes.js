// module imports
const express = require('express');
const {checkRequest} = require('../middlewares/requestFilter');
const { addAddress,editAddress,getAddress } = require('../controllers/updateProfileController');
const {updateProfile} = require('../controllers/updateProfileController');



// variable initializations
const router = express.Router();



router
    .route('/user/address/add-address')
    .post(checkRequest,addAddress);

router
    .route('/user/address')
    .get(checkRequest,getAddress)

router
    .route('/user/update-profile')
    .patch(checkRequest,updateProfile);    


router
    .route('/user/address/edit-address/:id')
    .put(checkRequest,editAddress);    


    
    
        

module.exports = router;
