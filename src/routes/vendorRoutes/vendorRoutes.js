// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {vendorRegistration} = require('../../controllers/vendor/vendorController');



// variable initializations
const router = express.Router();


router
    .route('/vendor/register')
    .post(vendorRegistration);
    

   

module.exports = router;
