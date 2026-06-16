const db = require("../../config/db");

const createCategory = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO categories(name,description) VALUES(?,?)",
      [data.name, data.description],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories ORDER BY id DESC", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const updateCategory = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE categories SET name=?, description=? WHERE id=?",
      [data.name, data.description, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM categories WHERE id=?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
