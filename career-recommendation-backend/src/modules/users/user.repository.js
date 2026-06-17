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

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT
        id,
        name,
        email,
        mobile,
        role,
        created_at
       FROM users
       ORDER BY id DESC`,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const adminUpdateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users
       SET name=?,
           mobile=?,
           role=?
       WHERE id=?`,
      [data.name, data.mobile, data.role, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const createAdminUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users
      (name,email,password,mobile,role)
      VALUES(?,?,?,?,?)`,
      [data.name, data.email, data.password, data.mobile, data.role],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
module.exports = {
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
  adminUpdateUser,
  createAdminUser,
  findUserByEmail,
};
