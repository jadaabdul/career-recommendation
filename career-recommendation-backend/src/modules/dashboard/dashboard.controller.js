const dashboardService = require("./dashboard.service");

exports.stats = async (req, res) => {
  try {
    const result = await dashboardService.getStats();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
