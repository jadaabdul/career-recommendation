const db = require("../../config/db");

const createCourse = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO courses
      (title,description,price,thumbnail,category_id,instructor_id)
      VALUES(?,?,?,?,?,?)`,
      [
        data.title,
        data.description,
        data.price,
        data.thumbnail,
        data.category_id,
        data.instructor_id,
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getAllCourses = (search = "", page = 1, limit = 5) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;

    const query = `
      SELECT
        c.*,
        cat.name AS category_name,
        i.name AS instructor_name
      FROM courses c
      LEFT JOIN categories cat
      ON c.category_id = cat.id
      LEFT JOIN instructors i
      ON c.instructor_id = i.id
      WHERE c.title LIKE ?
      ORDER BY c.id DESC
      LIMIT ? OFFSET ?
    `;

    db.query(
      query,
      [`%${search}%`, Number(limit), Number(offset)],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT
        c.*,
        cat.name AS category_name,
        i.name AS instructor_name
      FROM courses c
      LEFT JOIN categories cat
      ON c.category_id = cat.id
      LEFT JOIN instructors i
      ON c.instructor_id = i.id
      WHERE c.id=?`,
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const updateCourse = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE courses
       SET title=?,
           description=?,
           price=?,
           thumbnail=?,
           category_id=?,
           instructor_id=?
       WHERE id=?`,
      [
        data.title,
        data.description,
        data.price,
        data.thumbnail,
        data.category_id,
        data.instructor_id,
        id,
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM courses WHERE id=?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
