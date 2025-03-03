// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getVendorRequests, updateRequestStatus } = require('../../controllers/admin/vendorRequestController');



// variable initializations
const router = express.Router();


router
    .route('/vendor/vendor-requests')
    .get(checkRequest,getVendorRequests);


router
    .route('/vendor/request/update/:requestId')
    .post(checkRequest,updateRequestStatus);    

    

module.exports = router;
