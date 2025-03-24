// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {createUserOrder,getAllOrders,getSingleOrder} = require('../../controllers/buyer/orderController');



// variable initializations
const router = express.Router();

router
    .route('/user/order')
    .post(checkRequest,createUserOrder)

router
    .route('/user/order')
    .get(checkRequest,getAllOrders);    

router
    .route('/user/order/:orderId')
    .get(checkRequest,getSingleOrder)    

   

  


     

module.exports = router;
