// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {addItemToWishlist,getUserWishlist,deleteWishlistItem} = require('../../controllers/buyer/wishlistController');



// variable initializations
const router = express.Router();

router
    .route('/buyer/wishlist')
    .post(checkRequest,addItemToWishlist);

router
    .route('/buyer/wishlist')
    .get(checkRequest,getUserWishlist); 
    
    
router
    .route('/buyer/wishlist/:itemId')
    .delete(checkRequest,deleteWishlistItem); 

   

module.exports = router;
