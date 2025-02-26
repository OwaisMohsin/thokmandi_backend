// module imports
const express = require('express');
const {checkRequest} = require('../middlewares/requestFilter');
const {register,verify, login,forgotPassword,resetPassword} = require('../controllers/authController');
const {updateProfile} = require('../controllers/updateProfileController');
const { addCountry,getCountries } = require('../controllers/countryController');

// variable initializations
const router = express.Router();



router
    .route('/auth/register')
    .post(register);

router
    .route('/auth/login')
    .post(login)    

router
    .route('/auth/verify/:token')
    .get(verify);    
  

router
    .route('/auth/forgot-password')
    .post(forgotPassword);

router
    .route('/auth/reset-password')
    .patch(resetPassword);

router
    .route('/user/update-profile')
    .patch(checkRequest,updateProfile);

router
    .route('/country/create')
    .post(addCountry);  
    
router
    .route('/country')
    .get(getCountries);      
    
        

module.exports = router;
