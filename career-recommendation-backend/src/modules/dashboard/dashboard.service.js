const dashboardRepo = require("./dashboard.repository");

const getStats = async () => {
  return await dashboardRepo.getDashboardStats();
};

module.exports = {
  getStats,
};
