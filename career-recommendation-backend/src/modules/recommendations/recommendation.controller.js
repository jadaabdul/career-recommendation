const recommendationService = require("./recommendation.service");

exports.jobs = async (req, res) => {
  try {
    const result = await recommendationService.recommendJobs(req.user.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.courses = async (req, res) => {
  try {
    const result = await recommendationService.recommendCourses(req.user.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
