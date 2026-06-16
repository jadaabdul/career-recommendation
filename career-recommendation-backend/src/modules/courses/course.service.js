const courseRepo = require("./course.repository");

const addCourse = async (data) => {
  await courseRepo.createCourse(data);

  return {
    message: "Course Created Successfully",
  };
};

const getCourses = async (search = "", page = 1, limit = 5) => {
  return await courseRepo.getAllCourses(search, page, limit);
};

const getCourse = async (id) => {
  const result = await courseRepo.getCourseById(id);

  return result[0];
};

const editCourse = async (id, data) => {
  await courseRepo.updateCourse(id, data);

  return {
    message: "Course Updated Successfully",
  };
};

const removeCourse = async (id) => {
  await courseRepo.deleteCourse(id);

  return {
    message: "Course Deleted Successfully",
  };
};

module.exports = {
  addCourse,
  getCourses,
  getCourse,
  editCourse,
  removeCourse,
};
