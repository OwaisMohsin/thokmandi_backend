// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getVendorRequests, 
       updateRequestStatus,
       getVendorsCount,
       getVendorRequestByVendorEmail,
       searchVendorByEmail,
       getVendorRequestsCount,
       getAllVendors, 
       deleteRequest,
       updateApprovalStatus,
       deleteVendor } = require('../../controllers/admin/vendorController');



// variable initializations
const router = express.Router();

router
    .route('/vendor/request/approval')
    .put(checkRequest,updateApprovalStatus)

router
    .route('/vendor')
    .get(checkRequest, getAllVendors); 
    
router
    .route('/vendor/count')
    .get(checkRequest,getVendorsCount); 

router
    .route('/vendor/search')
    .post(checkRequest,searchVendorByEmail);    
    
router
    .route('/vendor/:vendorId')
    .delete(checkRequest,deleteVendor);    


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
