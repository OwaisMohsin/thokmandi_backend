// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {updateOrder,deleteOrder,getAllOrders} = require('../../controllers/vendor/orderController');



// variable initializations
const router = express.Router();

router
    .route('/vendor/order')
    .get(checkRequest,getAllOrders);

router
    .route('/vendor/order/update/:orderId')
    .put(checkRequest,updateOrder);

router
    .route('/vendor/order/delete/:orderId')
    .delete(checkRequest,deleteOrder);    

     

module.exports = router;
