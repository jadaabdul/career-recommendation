const skillRepo = require("./skill.repository");

const create = async (skillName) => {
  await skillRepo.createSkill(skillName);

  return {
    message: "Skill Added Successfully",
  };
};

const getAll = async () => {
  return await skillRepo.getAllSkills();
};

const assignSkill = async (userId, skillId) => {
  await skillRepo.addUserSkill(userId, skillId);

  return {
    message: "Skill Assigned Successfully",
  };
};

const mySkills = async (userId) => {
  return await skillRepo.getUserSkills(userId);
};

const removeSkill = async (userId, skillId) => {
  await skillRepo.removeUserSkill(userId, skillId);

  return {
    message: "Skill Removed Successfully",
  };
};

const update = async (id, skillName) => {
  await skillRepo.updateSkill(id, skillName);

  return {
    message: "Skill Updated Successfully",
  };
};

const remove = async (id) => {
  await skillRepo.deleteSkill(id);

  return {
    message: "Skill Deleted Successfully",
  };
};

module.exports = {
  create,
  getAll,
  assignSkill,
  mySkills,
  removeSkill,
  update,
  remove,
};
