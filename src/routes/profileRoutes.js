// module imports
const express = require('express');
const {checkRequest} = require('../middlewares/requestFilter');
const { addAddress,editAddress } = require('../controllers/updateProfileController');



// variable initializations
const router = express.Router();



router
    .route('/user/address/add-address')
    .post(checkRequest,addAddress);

router
    .route('/user/address/edit-address')
    .put(checkRequest,editAddress);    


    
    
        

module.exports = router;
