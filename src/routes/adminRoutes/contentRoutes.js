// module imports
const express = require("express");
const { checkRequest } = require("../../middlewares/requestFilter");
const {
  updateFinancialTerms,
  getFinancialTerms,
  getVendorTerms,
  updateVendorTerms,
  getBuyerTerms,
  updateBuyerTerms,
  getPrivacyPolicy,
  updatePrivacyPolicy,
  getRefundPolicy,
  updateRefundPolicy,
  getServiceTerms,
  updateServiceTerms,
  getProductGuidelines,
  updateProductGuidelines,
  getPhotographGuidelines,
  updatePhotographGuidelines

} = require("../../controllers/admin/contentController");

// variable initializations
const router = express.Router();

// Financial Terms and Conditions

router
  .route("/content/financial-terms/update")
  .post(checkRequest, updateFinancialTerms);

router
    .route("/content/financial-terms")
    .get(checkRequest, getFinancialTerms);

// Vendor Terms and Conditions

router
    .route("/content/vendor/terms")
    .get(checkRequest, getVendorTerms);

router
  .route("/content/vendor/terms/update")
  .post(checkRequest, updateVendorTerms);

// Buyer Tems and Conditions

router
    .route("/content/buyer/terms")
    .get(checkRequest, getBuyerTerms);

router
  .route("/content/buyer/terms/update")
  .post(checkRequest, updateBuyerTerms);


// Privacy Policy

router
    .route("/content/privacy-policy")
    .get(checkRequest, getPrivacyPolicy);

router
  .route("/content/privacy-policy/update")
  .post(checkRequest, updatePrivacyPolicy);

// Refund Policy

router
    .route("/content/refund-policy")
    .get(checkRequest, getRefundPolicy);

router
  .route("/content/refund-policy/update")
  .post(checkRequest, updateRefundPolicy);  


// Terms of Service

router
    .route("/content/service-terms")
    .get(checkRequest, getServiceTerms);

router
  .route("/content/service-terms/update")
  .post(checkRequest, updateServiceTerms); 
  
// Product Guidlines

router
    .route("/content/product-guidelines")
    .get(checkRequest, getProductGuidelines);

router
  .route("/content/product-guidelines/update")
  .post(checkRequest, updateProductGuidelines); 
  
  
router
  .route("/content/photograph-guidelines")
  .get(checkRequest, getPhotographGuidelines);

router
.route("/content/photograph-guidelines/update")
.post(checkRequest, updatePhotographGuidelines);   

module.exports = router;
