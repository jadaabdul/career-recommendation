const repo = require("./recommendation.repository");

const recommendJobs = async (userId) => {
  const userSkills = await repo.getUserSkills(userId);

  const userSkillIds = userSkills.map((item) => item.skill_id);

  const jobs = await repo.getJobs();

  const recommendations = [];

  for (const job of jobs) {
    const jobSkills = await repo.getJobSkills(job.id);

    const jobSkillIds = jobSkills.map((item) => item.skill_id);

    const matched = jobSkillIds.filter((skill) => userSkillIds.includes(skill));

    const percentage =
      jobSkillIds.length === 0
        ? 0
        : Math.round((matched.length / jobSkillIds.length) * 100);

    if (percentage >= 60) {
      recommendations.push({
        ...job,
        match_percentage: percentage,
      });
    }
  }

  return recommendations;
};

const recommendCourses = async (userId) => {
  const userSkills = await repo.getUserSkills(userId);

  const userSkillIds = userSkills.map((item) => item.skill_id);

  const jobs = await repo.getJobs();

  const missingSkills = new Set();

  for (const job of jobs) {
    const jobSkills = await repo.getJobSkills(job.id);

    jobSkills.forEach((skill) => {
      if (!userSkillIds.includes(skill.skill_id)) {
        missingSkills.add(skill.skill_id);
      }
    });
  }

  const courses = [];

  for (const skillId of missingSkills) {
    const result = await repo.getCoursesBySkill(skillId);

    courses.push(...result);
  }

  return courses;
};

module.exports = {
  recommendJobs,
  recommendCourses,
};
