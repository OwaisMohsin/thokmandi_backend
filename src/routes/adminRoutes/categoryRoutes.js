// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllCategories,createProductCategory} = require('../../controllers/admin/categoryController')



// variable initializations
const router = express.Router();


router
    .route('/category')
    .get(checkRequest,getAllCategories);

router
    .route('/category/create')
    .post(checkRequest,createProductCategory)   

    
router
    .route('/category/all-categories')
    .get(checkRequest,getAllCategories);

     

module.exports = router;
