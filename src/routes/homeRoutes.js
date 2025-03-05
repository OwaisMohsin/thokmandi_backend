// module imports
const express = require('express');
const {checkRequest} = require('../middlewares/requestFilter');
const {getHomePageContent} = require('../controllers/homeController');



// variable initializations
const router = express.Router();



router
    .route('/home/content')
    .get(getHomePageContent);


module.exports = router;
