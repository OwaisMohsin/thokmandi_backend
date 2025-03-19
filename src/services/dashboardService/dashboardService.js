const { Role } = require("@prisma/client");
const dashboardRepository = require("../../repositories/dashRepository/dashboardRepository");

exports.fetchDashboardData = async (req, res) => {
  try {
    
    const users = await dashboardRepository.getAllUsers();

    const allUsers = users.filter((user) => user.role !== Role.ADMIN);

    
    
    const buyers = allUsers.filter((user) => user.role === Role.BUYER);
    // console.log("All users are", buyers);
    const vendors = allUsers.filter((user) => user.role === Role.VENDOR);
    const products = await dashboardRepository.getAllProducts();

    // console.log(buyers, vendors, products);

    return {
      buyers,
      vendors,
      products,
    };
  } catch (error) {
    throw error;
  }
};
