const asyncHandler = require("../../utils/asyncHandler");
const dashboardService = require('../../services/dashboardService/dashboardService');

exports.getDashboardData = asyncHandler(async (req, res) => {
    await dashboardService.fetchDashboardData();
});
