const { body, validationResult } = require("express-validator");

const courseValidation = [
  body("title").notEmpty().withMessage("Course title is required"),

  body("description").notEmpty().withMessage("Description is required"),

  body("price").notEmpty().withMessage("Price is required"),

  body("category_id").notEmpty().withMessage("Category is required"),

  body("instructor_id").notEmpty().withMessage("Instructor is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = {
  courseValidation,
};
