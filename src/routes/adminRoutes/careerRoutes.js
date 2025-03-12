const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllJobs,createJob,updateJob,deleteJob,getSingleJob,applyForJob,getAllApplications} = require('../../controllers/admin/careerController');


// variable initializations
const router = express.Router();


router
    .route("/jobs")
    .get(getAllJobs);

router
    .route('/jobs/:jobId')
    .get(getSingleJob);  
        

router
    .route('/admin/job/create')
    .post(checkRequest,createJob);   
    
router
    .route('/admin/job/update/:jobId')
    .put(checkRequest,updateJob);  
    
router
    .route('/admin/job/delete/:jobId')
    .delete(checkRequest,deleteJob);  
    
///// APPLICATION ROUTES///////

router
    .route('/job/:jobId/apply')
    .post(applyForJob);

router
    .route('/admin/job/applications')
    .get(checkRequest,getAllApplications);    



 

module.exports = router;