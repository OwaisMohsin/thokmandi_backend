const asyncHandler = require("../../utils/asyncHandler");
const dashboardService = require("../../services/dashboardService/dashboardService");

exports.getDashboardData = asyncHandler(async (req, res) => {
  const data = await dashboardService.fetchDashboardData();
  return res.status(200).json({
    status: true,
    message: "Dashboard data found",
    data: {
      buyers: data.buyers,
      vendors: data.vendors,
      products: data.products,
    },
  });
});
