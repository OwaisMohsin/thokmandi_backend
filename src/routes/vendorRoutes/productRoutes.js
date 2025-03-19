// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {addProduct,getProductTags,serachTag,getVendorProducts} = require('../../controllers/vendor/productController')



// variable initializations
const router = express.Router();


router
    .route('/vendor/product/tags')
    .get(checkRequest,getProductTags);

router
    .route('/vendor/product/tags/search')
    .get(checkRequest,serachTag);    

router
    .route('/vendor/product/create')
    .post(checkRequest,addProduct); 
    
router
    .route('/vendor/product')
    .get(checkRequest,getVendorProducts);    
     

module.exports = router;
