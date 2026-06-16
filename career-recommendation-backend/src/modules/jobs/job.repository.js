const db = require("../../config/db");

const createJob = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO jobs
      (title,company,location,salary,description)
      VALUES(?,?,?,?,?)`,
      [data.title, data.company, data.location, data.salary, data.description],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getJobs = (search = "", page = 1, limit = 5) => {
  return new Promise((resolve, reject) => {
    const offset = (page - 1) * limit;

    db.query(
      `
      SELECT *
      FROM jobs
      WHERE title LIKE ?
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [`%${search}%`, Number(limit), Number(offset)],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getJobById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM jobs WHERE id=?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const addJobSkill = (jobId, skillId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO job_skills
      (job_id,skill_id)
      VALUES(?,?)`,
      [jobId, skillId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getJobSkills = (jobId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT
          s.id,
          s.skill_name
       FROM job_skills js
       JOIN skills s
       ON js.skill_id=s.id
       WHERE js.job_id=?`,
      [jobId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  addJobSkill,
  getJobSkills,
};
