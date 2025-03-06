const asyncHandler = require("../utils/asyncHandler");
const homePageService = require("../services/homePageService/homePageService");

exports.getHomePageContent = asyncHandler(async (req, res) => {
  const { categories, faqs ,countries} = await homePageService.getContent();
  return res.status(200).json({
    status: true,
    message: "Data found",
    data: {
      categories,
      faqs,
    },
  });
});
