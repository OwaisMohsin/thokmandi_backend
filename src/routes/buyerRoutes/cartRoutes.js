// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {addProductToCart,getUserCart,deleteCartItem,updateCartItemQuantity,deleteAllItems} = require('../../controllers/buyer/cartController');



// variable initializations
const router = express.Router();

router
    .route('/user/cart')
    .get(checkRequest,getUserCart)

router
    .route('/user/cart/add-item')
    .post(checkRequest,addProductToCart);

router
    .route('/user/cart/item/update/:itemId')
    .put(checkRequest,updateCartItemQuantity);    

router
    .route('/user/cart/item/delete/:itemId')
    .delete(checkRequest,deleteCartItem)   
    
router
    .route('/user/cart/delete')
    .delete(checkRequest,deleteAllItems)     


     

module.exports = router;
