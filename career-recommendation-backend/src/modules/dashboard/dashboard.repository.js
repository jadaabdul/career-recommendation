const db = require("../../config/db");

const getDashboardStats = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(*) FROM courses) AS totalCourses,
      (SELECT COUNT(*) FROM jobs) AS totalJobs,
      (SELECT COUNT(*) FROM enrollments) AS totalEnrollments
    `;

    db.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

module.exports = {
  getDashboardStats,
};
