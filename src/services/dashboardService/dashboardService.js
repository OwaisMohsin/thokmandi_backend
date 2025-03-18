const { Role } = require("@prisma/client");
const dashboardRepository = require("../../repositories/dashRepository/dashboardRepository");

exports.fetchDashboardData = async (req, res) => {
  try {
    const users = await dashboardRepository.getAllUsers();
    const allUsers = users.filter((user) => user.role !== Role.ADMIN);
    console.log(typeof(allUsers));
    
    const buyers = allUsers.filter((user) => user.role === Role.BUYER).length;
    const vendors = allUsers
      .filter((user) => user.role === Role.VENDOR)
      .length;
    const products = await dashboardRepository.getAllProductsCount();

    return {
      buyers,
      vendors,
      products,
    };
  } catch (error) {
    throw error;
  }
};
