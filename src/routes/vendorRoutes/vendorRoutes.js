// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {vendorRegistration,getVendorById} = require('../../controllers/vendor/vendorController');



// variable initializations
const router = express.Router();


router
    .route('/auth/vendor/register')
    .post(vendorRegistration);

router
    .route('/vendor/:vendorId')
    .get(checkRequest,getVendorById)
    

   

module.exports = router;
