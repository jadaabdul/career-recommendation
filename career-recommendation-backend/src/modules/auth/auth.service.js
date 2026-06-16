const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRepo = require("./auth.repository");

const registerUser = async (data) => {
  const existingUser = await authRepo.findUserByEmail(data.email);

  if (existingUser.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  data.password = hashedPassword;

  await authRepo.createUser(data);

  return {
    message: "User Registered Successfully",
  };
};

const loginUser = async (email, password) => {
  const user = await authRepo.findUserByEmail(email);

  if (user.length === 0) {
    throw new Error("Invalid Email");
  }

  const isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign(
    {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      role: user[0].role,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};
