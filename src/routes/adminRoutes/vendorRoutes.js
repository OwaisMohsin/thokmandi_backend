// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getVendorRequests, updateRequestStatus,getVendorRequestByVendorEmail,getVendorRequestsCount, deleteRequest,updateApprovalStatus } = require('../../controllers/admin/vendorRequestController');



// variable initializations
const router = express.Router();

router
    .route('/vendor/request/approval')
    .put(checkRequest,updateApprovalStatus)


router
    .route('/vendor/vendor-requests')
    .get(checkRequest,getVendorRequests);

router
    .route('/vendor/vendor-request/search')
    .post(checkRequest,getVendorRequestByVendorEmail);    

 
router
    .route('/vendor/vendor-requests/count')
    .get(checkRequest,getVendorRequestsCount);    


router
    .route('/vendor/request/update/:storeId')
    .put(checkRequest,updateRequestStatus);  
    
router
    .route('/vendor/request/delete/:storeId')
    .delete(checkRequest,deleteRequest);    

    

module.exports = router;
