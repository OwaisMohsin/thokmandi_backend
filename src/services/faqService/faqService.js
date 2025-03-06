const faqRepository = require("../../repositories/faqRepository/faqRepository");
const AppError = require("../../utils/AppError");

exports.getFaqs = async () => {
  try {
    return await faqRepository.getAllFaqs();
  } catch (error) {
    throw error;
  }
};

exports.createFaq = async (data) => {
  try {
    return await faqRepository.create(data);
  } catch (error) {
    throw error;
  }
};

exports.updateFaqById = async (id, data) => {
  try {
    const faq = faqRepository.index(id);
    if (!faq) {
      throw new AppError("No faq found with provided ID", 404);
    }
    return await faqRepository.update(id, data);
  } catch (error) {
    throw error;
  }
};

exports.deleteFaqById = async (id) => {
  try {
    return await faqRepository.delete(id);
  } catch (error) {
    throw error;
  }
};
