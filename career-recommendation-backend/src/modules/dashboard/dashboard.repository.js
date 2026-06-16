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

    db.query(query, async (err, result) => {
      if (err) {
        reject(err);
      } else {
        db.query(
          `
          SELECT
            id,
            name,
            email,
            created_at
          FROM users
          ORDER BY id DESC
          LIMIT 5
          `,
          (userErr, users) => {
            if (userErr) reject(userErr);

            db.query(
              `
              SELECT
                id,
                title,
                company,
                created_at
              FROM jobs
              ORDER BY id DESC
              LIMIT 5
              `,
              (jobErr, jobs) => {
                if (jobErr) reject(jobErr);

                db.query(
                  `
                  SELECT *
                  FROM enrollments
                  ORDER BY id DESC
                  LIMIT 5
                  `,
                  (enrollErr, enrollments) => {
                    if (enrollErr) reject(enrollErr);

                    resolve({
                      ...result[0],

                      latestUsers: users,

                      latestJobs: jobs,

                      latestEnrollments: enrollments,
                    });
                  },
                );
              },
            );
          },
        );
      }
    });
  });
};

module.exports = {
  getDashboardStats,
};
