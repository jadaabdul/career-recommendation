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

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const result = await userService.editUser(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const result = await userService.removeUser(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  editUser,
  removeUser,
  createUser,
};
