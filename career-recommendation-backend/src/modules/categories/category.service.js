const categoryRepo = require("./category.repository");

const addCategory = async (data) => {
  await categoryRepo.createCategory(data);

  return {
    message: "Category Created Successfully",
  };
};

const getCategories = async () => {
  return await categoryRepo.getAllCategories();
};

const editCategory = async (id, data) => {
  await categoryRepo.updateCategory(id, data);

  return {
    message: "Category Updated Successfully",
  };
};

const removeCategory = async (id) => {
  await categoryRepo.deleteCategory(id);

  return {
    message: "Category Deleted Successfully",
  };
};

module.exports = {
  addCategory,
  getCategories,
  editCategory,
  removeCategory,
};
