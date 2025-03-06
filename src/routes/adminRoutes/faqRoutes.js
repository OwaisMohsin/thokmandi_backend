const express = require('express');
const {checkRequest} = require('../../middlewares/requestFilter');
const {getAllFaqs,createFaq,deleteFaq,updateFaq} = require('../../controllers/admin/faqController');


// variable initializations
const router = express.Router();


router
    .route("/faqs")
    .get(checkRequest,getAllFaqs);

router
    .route("/faq")
    .post(checkRequest,createFaq);


router
    .route("/faq/update/:faqId")
    .put(checkRequest,updateFaq);


router
    .route("/faq/delete/:faqId")
    .delete(checkRequest,deleteFaq);  

module.exports = router;