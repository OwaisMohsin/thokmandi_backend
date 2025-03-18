// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {createCoupon,getAllCoupons, updateCoupon, deleteCoupon} = require('../../controllers/vendor/couponController');




const router = express.Router();

router
    .route('/vendor/coupon')
    .get(checkRequest,getAllCoupons);

router
    .route('/vendor/coupon')
    .post(checkRequest,createCoupon);

router
    .route('/vendor/coupon/:couponId')
    .patch(checkRequest,updateCoupon);
    
router
    .route('/vendor/coupon/:couponId')
    .delete(checkRequest,deleteCoupon);    


     

module.exports = router;
