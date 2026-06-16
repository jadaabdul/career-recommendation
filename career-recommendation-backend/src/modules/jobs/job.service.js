const jobRepo = require("./job.repository");

const create = async (data) => {
  await jobRepo.createJob(data);

  return {
    message: "Job Created Successfully",
  };
};

const getAll = async (search = "", page = 1, limit = 5) => {
  return await jobRepo.getJobs(search, page, limit);
};

const getOne = async (id) => {
  const result = await jobRepo.getJobById(id);

  return result[0];
};

const assignSkill = async (jobId, skillId) => {
  await jobRepo.addJobSkill(jobId, skillId);

  return {
    message: "Skill Assigned To Job",
  };
};

const jobSkills = async (jobId) => {
  return await jobRepo.getJobSkills(jobId);
};

module.exports = {
  create,
  getAll,
  getOne,
  assignSkill,
  jobSkills,
};
