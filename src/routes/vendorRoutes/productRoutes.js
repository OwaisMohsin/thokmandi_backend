// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {addProduct,getAllProducts,getSingleProduct} = require('../../controllers/vendor/productController')



// variable initializations
const router = express.Router();

router
    .route('/products')
    .get(getAllProducts);

router.
    route('/product/:productId')
    .get(getSingleProduct);    


router
    .route('/vendor/product/create')
    .post(checkRequest,addProduct);
     

module.exports = router;
