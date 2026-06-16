const userService = require("./user.service");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await userService.getProfile(userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await userService.updateProfile(userId, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
