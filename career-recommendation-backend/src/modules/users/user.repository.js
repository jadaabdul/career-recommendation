const db = require("../../config/db");

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id,name,email,mobile,role,created_at
       FROM users
       WHERE id=?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users
       SET name=?,
           mobile=?
       WHERE id=?`,
      [data.name, data.mobile, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

module.exports = {
  getUserById,
  updateUser,
};
