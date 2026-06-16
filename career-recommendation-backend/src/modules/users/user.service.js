const userRepo = require("./user.repository");

const getProfile = async (id) => {
  const user = await userRepo.getUserById(id);

  return user[0];
};

const updateProfile = async (id, data) => {
  await userRepo.updateUser(id, data);

  return {
    message: "Profile Updated",
  };
};

module.exports = {
  getProfile,
  updateProfile,
};
