const asyncHandler = require("../../utils/asyncHandler");
const contentService = require("../../services/contentService/contentService");

exports.getFinancialTerms = asyncHandler(async (req, res) => {
  const financialTerms = await contentService.fetchFinancialTerms();
  return res.status(200).json({
    status: true,
    message: "Financial T&Cs fetched successfully",
    data: {
      financialTerms,
    },
  });
});

exports.updateFinancialTerms = asyncHandler(async (req, res) => {
  const data = req.body;
  const financialTerms = await contentService.createTerms(data);
  return res.status(201).json({
    status: true,
    message: "Financial T&Cs added successfully",
    data: {
      financialTerms,
    },
  });
});

exports.getVendorTerms = asyncHandler(async (req, res) => {
  const vendorTerms = await contentService.fetchVendorTerms();
  return res.status(200).json({
    status: true,
    message: "Vednor T&Cs fetched successfully",
    data: {
      vendorTerms,
    },
  });
});

exports.updateVendorTerms = asyncHandler(async (req, res) => {
  const data = req.body;
  const vendorTerms = await contentService.createVendorTerms(data);
  return res.status(201).json({
    status: true,
    message: "Vendor T&Cs added successfully",
    data: {
      vendorTerms,
    },
  });
});

exports.getBuyerTerms = asyncHandler(async (req, res) => {
  const buyerTerms = await contentService.fetchBuyerTerms();
  return res.status(200).json({
    status: true,
    message: "Buyer T&Cs fetched successfully",
    data: {
      buyerTerms,
    },
  });
});

exports.updateBuyerTerms = asyncHandler(async (req, res) => {
  const data = req.body;
  const buyerTerms = await contentService.createBuyerTerms(data);
  return res.status(201).json({
    status: true,
    message: "Buyer T&Cs added successfully",
    data: {
      buyerTerms,
    },
  });
});

exports.getPrivacyPolicy = asyncHandler(async (req, res) => {
  const privacyPolicy = await contentService.fetchPrivacyPolicy();
  return res.status(200).json({
    status: true,
    message: "Privacy Policy fetched successfully",
    data: {
      privacyPolicy,
    },
  });
});

exports.updatePrivacyPolicy = asyncHandler(async (req, res) => {
  const data = req.body;
  const PrivacyPolicy = await contentService.createPrivacyPolicy(data);
  return res.status(201).json({
    status: true,
    message: "Privacy Policy added successfully",
    data: {
      PrivacyPolicy,
    },
  });
});

exports.getRefundPolicy = asyncHandler(async (req, res) => {
  const refundPolicy = await contentService.fetchRefundPolicy();
  return res.status(200).json({
    status: true,
    message: "Refund Policy fetched successfully",
    data: {
      refundPolicy,
    },
  });
});

exports.updateRefundPolicy = asyncHandler(async (req, res) => {
  const data = req.body;
  const refundPolicy = await contentService.createRefundPolicy(data);
  return res.status(201).json({
    status: true,
    message: "Refund Policy added successfully",
    data: {
      refundPolicy,
    },
  });
});


exports.getServiceTerms = asyncHandler(async (req, res) => {
  const serviceTerms = await contentService.fetchServiceTerms();
  return res.status(200).json({
    status: true,
    message: "Service Terms fetched successfully",
    data: {
      serviceTerms,
    },
  });
});

exports.updateServiceTerms = asyncHandler(async (req, res) => {
  const data = req.body;
  const serviceTerms = await contentService.createServiceTerms(data);
  return res.status(201).json({
    status: true,
    message: "ServiceTerms added successfully",
    data: {
      serviceTerms,
    },
  });
});


exports.getProductGuidelines = asyncHandler(async (req, res) => {
  const productGuidelines = await contentService.fetchProductGuidelines();
  return res.status(200).json({
    status: true,
    message: "Product Guidelines fetched successfully",
    data: {
      productGuidelines,
    },
  });
});

exports.updateProductGuidelines = asyncHandler(async (req, res) => {
  const data = req.body;
  
  const productGuidelines = await contentService.createProductGuidelines(data);
  return res.status(201).json({
    status: true,
    message: "Product Guidelines added successfully",
    data: {
      productGuidelines,
    },
  });
});


exports.getPhotographGuidelines = asyncHandler(async (req, res) => {
  const photographGuidelines = await contentService.fetchPhotographGuidelines();
  return res.status(200).json({
    status: true,
    message: "Photograph Guidelines fetched successfully",
    data: {
      photographGuidelines,
    },
  });
});

exports.updatePhotographGuidelines = asyncHandler(async (req, res) => {
  const data = req.body;
  
  const photographGuidelines = await contentService.createPhotographGuidelines(data);
  return res.status(201).json({
    status: true,
    message: "Photograph Guidelines added successfully",
    data: {
      photographGuidelines,
    },
  });
});

