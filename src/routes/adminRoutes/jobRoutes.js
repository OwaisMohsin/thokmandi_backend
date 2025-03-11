const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllJobs,createJob,updateJob,deleteJob} = require('../../controllers/admin/jobController');


// variable initializations
const router = express.Router();


router
    .route("/jobs")
    .get(checkRequest,getAllJobs);

router
    .route('/admin/job/create')
    .post(checkRequest,createJob);   
    
router
    .route('/admin/job/update/:jobId')
    .put(checkRequest,updateJob);  
    
router
    .route('/admin/job/delete/:jobId')
    .delete(checkRequest,deleteJob);    



 

module.exports = router;