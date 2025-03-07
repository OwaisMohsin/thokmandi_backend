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
