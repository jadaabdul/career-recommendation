const db = require("../../config/db");

const createSkill = (skillName) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO skills(skill_name) VALUES(?)",
      [skillName],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getAllSkills = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM skills", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const addUserSkill = (userId, skillId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO user_skills(user_id,skill_id) VALUES(?,?)",
      [userId, skillId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const getUserSkills = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT
          s.id,
          s.skill_name
       FROM user_skills us
       JOIN skills s
       ON us.skill_id = s.id
       WHERE us.user_id=?`,
      [userId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

const removeUserSkill = (userId, skillId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM user_skills
       WHERE user_id=? AND skill_id=?`,
      [userId, skillId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

module.exports = {
  createSkill,
  getAllSkills,
  addUserSkill,
  getUserSkills,
  removeUserSkill,
};
