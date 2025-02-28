// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {addProductToCart,getUserCart,deleteCartItem} = require('../../controllers/buyer/cartController');



// variable initializations
const router = express.Router();

router
    .route('/user/cart')
    .get(checkRequest,getUserCart)

router
    .route('/user/cart/add-item')
    .post(checkRequest,addProductToCart);

router
    .route('/user/cart/item/delete/:itemId')
    .delete(checkRequest,deleteCartItem)    


     

module.exports = router;
