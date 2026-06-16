const db = require("../../config/db");

const enrollCourse = (userId, courseId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO enrollments(user_id, course_id)
       VALUES(?, ?)`,
      [userId, courseId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const checkEnrollment = (userId, courseId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM enrollments
       WHERE user_id=? AND course_id=?`,
      [userId, courseId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getMyCourses = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT
          c.id,
          c.title,
          c.description,
          c.price,
          c.thumbnail,
          cat.name AS category_name,
          i.name AS instructor_name
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       LEFT JOIN categories cat ON c.category_id = cat.id
       LEFT JOIN instructors i ON c.instructor_id = i.id
       WHERE e.user_id=?`,
      [userId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

module.exports = {
  enrollCourse,
  checkEnrollment,
  getMyCourses,
};
