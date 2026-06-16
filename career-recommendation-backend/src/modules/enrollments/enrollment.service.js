const enrollmentRepo = require("./enrollment.repository");

const enroll = async (userId, courseId) => {
  const existing = await enrollmentRepo.checkEnrollment(userId, courseId);

  if (existing.length > 0) {
    throw new Error("Already enrolled in this course");
  }

  await enrollmentRepo.enrollCourse(userId, courseId);

  return {
    message: "Course Enrolled Successfully",
  };
};

const myCourses = async (userId) => {
  return await enrollmentRepo.getMyCourses(userId);
};

module.exports = {
  enroll,
  myCourses,
};
