// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllCategories,createProductCategory,updateCategory} = require('../../controllers/admin/categoryController')



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

router
    .route('/category/update/:categoryId')
    .put(checkRequest,updateCategory)

     

module.exports = router;
