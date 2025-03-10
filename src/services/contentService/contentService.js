const contentRepository = require("../../repositories/contentRepository/contentRepository");

exports.fetchFinancialTerms = async (req, res) => {
  try {
    return await contentRepository.getFinancialTerms();
  } catch (error) {
    throw error;
  }
};

exports.createTerms = async (data) => {
  try {
    return await contentRepository.upsertFinancialTerms(data);
  } catch (error) {
    throw error;
  }
};

exports.fetchVendorTerms = async () => {
  try {
    return await contentRepository.getVendorTerms();
  } catch (error) {}
};

exports.createVendorTerms = async (data) => {
  try {
    return await contentRepository.upsertVendorTerms(data);
  } catch (error) {
    throw error;
  }
};

exports.fetchBuyerTerms = async (req, res) => {
  try {
    return await contentRepository.getBuyerTerms();
  } catch (error) {
    throw error;
  }
};

exports.createBuyerTerms = async (data) => {
  try {
    return await contentRepository.upsertBuyerTerms(data);
  } catch (error) {
    throw error;
  }
};

exports.fetchPrivacyPolicy = async (req, res) => {
  try {
    return await contentRepository.getPrivacyPolicy();
  } catch (error) {
    throw error;
  }
};

exports.createPrivacyPolicy = async (data) => {
  try {
    return await contentRepository.upsertPrivacyPolicy(data);
  } catch (error) {
    throw error;
  }
};

exports.fetchRefundPolicy = async (req, res) => {
  try {
    return await contentRepository.getRefundPolicy();
  } catch (error) {
    throw error;
  }
};

exports.createRefundPolicy = async (data) => {
  try {
    return await contentRepository.upsertRefundPolicy(data);
  } catch (error) {
    throw error;
  }
};

exports.fetchServiceTerms = async (req, res) => {
  try {
    return await contentRepository.getServiceTerms();
  } catch (error) {
    throw error;
  }
};

exports.createServiceTerms = async (data) => {
  try {
    return await contentRepository.upsertServiceTerms(data);
  } catch (error) {
    throw error;
  }
};

exports.fetchProductGuidelines = async (req, res) => {
  try {
    return await contentRepository.getProductGuidelines();
  } catch (error) {
    throw error;
  }
};

exports.createProductGuidelines = async (data) => {
  try {
    return await contentRepository.upsertProductGuidelines(data);
  } catch (error) {
    throw error;
  }
};


exports.fetchPhotographGuidelines = async (req, res) => {
  try {
    return await contentRepository.getPhotographGuidelines();
  } catch (error) {
    throw error;
  }
};

exports.createPhotographGuidelines = async (data) => {
  try {
    return await contentRepository.upsertPhotographGuidelines(data);
  } catch (error) {
    throw error;
  }
};
