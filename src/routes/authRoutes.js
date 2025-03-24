// module imports
const express = require('express');
const {checkRequest} = require('../middlewares/requestFilter');
const {register,verify, login,forgotPassword,resetPassword,resendVerificationLink} = require('../controllers/authController');
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
    .post(verify);   
    
router
    .route('/auth/resend-link')
    .post(resendVerificationLink);    
  

router
    .route('/auth/forgot-password')
    .post(forgotPassword);

router
    .route('/auth/reset-password')
    .patch(resetPassword);



router
    .route('/country/create')
    .post(addCountry);  
    
router
    .route('/country')
    .get(getCountries);      
    
        

module.exports = router;
