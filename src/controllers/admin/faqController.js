const faqService = require("../../services/faqService/faqService");
const asyncHandler = require("../../utils/asyncHandler");

exports.getAllFaqs = asyncHandler(async (req, res) => {
  const faqs = await faqService.getFaqs();
  if (faqs && faqs.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Sub admins fetch successfully",
      data: { faqs },
    });
  }
  return res.status(200).json({
    status: true,
    message: "No faqs found",
    data: { faqs: [] },
  });
});

exports.createFaq = async (req, res) => {
  const data = {
    question: req.body.question,
    answer: req.body.answer,
  };
  const faq = await faqService.createFaq(data);

  return res.status(201).json({
    status: true,
    message: "Faq created successfully",
    data: { faq },
  });
};

exports.updateFaq = async (req, res) => {
  const faqId = req.params.faqId;

  const data = {
    question: req.body.question,
    answer: req.body.answer,
  };

  const faq = await faqService.updateFaqById(faqId, data);

  res.status(200).json({
    status: true,
    message: "Faq updated successfully",
    data: { faq },
  });
};

exports.deleteFaq = async (req, res) => {
  const faqId = req.params.faqId;
  await faqService.deleteFaqById(faqId);

  return res
    .status(200)
    .json({ status: true, message: "Faq deleted successfully" });
};
