// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllCategories,createProductCategory,updateCategory,deleteCategory} = require('../../controllers/admin/categoryController')



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

router
    .route('/category/delete/:categoryId')
    .delete(checkRequest,deleteCategory);    

     

module.exports = router;
