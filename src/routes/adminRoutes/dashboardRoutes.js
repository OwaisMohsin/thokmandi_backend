// module imports
const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getDashboardData} = require('../../controllers/admin/dashboardController');



// variable initializations
const router = express.Router();


router
    .route('/admin/dashboard/dashboard-stats')
    .get(checkRequest,getDashboardData);
    
     

module.exports = router;
