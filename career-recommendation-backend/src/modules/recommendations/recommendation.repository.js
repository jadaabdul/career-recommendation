const db = require("../../config/db");

const getUserSkills = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT skill_id
       FROM user_skills
       WHERE user_id=?`,
      [userId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getJobs = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM jobs", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const getJobSkills = (jobId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT skill_id
       FROM job_skills
       WHERE job_id=?`,
      [jobId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getCoursesBySkill = (skillId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT
          c.id,
          c.title,
          c.description,
          c.price,
          s.skill_name
       FROM course_skills cs
       JOIN courses c
       ON cs.course_id = c.id
       JOIN skills s
       ON cs.skill_id = s.id
       WHERE cs.skill_id=?`,
      [skillId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

module.exports = {
  getUserSkills,
  getJobs,
  getJobSkills,
  getCoursesBySkill,
};
