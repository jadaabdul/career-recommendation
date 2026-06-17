const userRepo = require("./user.repository");

const bcrypt = require("bcryptjs");

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

const getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

const removeUser = async (id) => {
  await userRepo.deleteUser(id);

  return {
    message: "User Deleted Successfully",
  };
};

const editUser = async (id, data) => {
  await userRepo.adminUpdateUser(id, data);

  return {
    message: "User Updated Successfully",
  };
};

const createUser = async (data) => {
  const existing = await userRepo.findUserByEmail(data.email);

  if (existing.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  data.password = hashedPassword;

  await userRepo.createAdminUser(data);

  return {
    message: "User Created Successfully",
  };
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  removeUser,
  editUser,
  createUser,
};
