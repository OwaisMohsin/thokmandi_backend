// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {addProduct} = require('../../controllers/vendor/productController')



// variable initializations
const router = express.Router();



router
    .route('/vendor/product/create')
    .post(checkRequest,addProduct);
     

module.exports = router;
