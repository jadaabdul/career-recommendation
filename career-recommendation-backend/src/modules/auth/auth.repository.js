const db = require("../../config/db");

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (name,email,password,mobile)
       VALUES (?,?,?,?)`,
      [userData.name, userData.email, userData.password, userData.mobile],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

module.exports = {
  findUserByEmail,
  createUser,
};
