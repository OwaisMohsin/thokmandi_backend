// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllProducts,getSingleProduct,getProductsByCategory} = require('../../controllers/buyer/productController');



// variable initializations
const router = express.Router();

router
    .route('/products')
    .get(getAllProducts);

router
    .route('/products/category/:category')
    .get(getProductsByCategory)
    

router.
    route('/product/:productId')
    .get(getSingleProduct);    


     

module.exports = router;
