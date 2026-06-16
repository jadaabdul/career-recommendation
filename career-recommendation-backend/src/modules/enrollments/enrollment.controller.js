const enrollmentService = require("./enrollment.service");

const enroll = async (req, res) => {
  try {
    const userId = req.user.id;
    const { course_id } = req.body;

    const result = await enrollmentService.enroll(userId, course_id);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const myCourses = async (req, res) => {
  try {
    const result = await enrollmentService.myCourses(req.user.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  enroll,
  myCourses,
};
