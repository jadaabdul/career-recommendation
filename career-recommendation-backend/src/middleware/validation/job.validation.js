const { body, validationResult } = require("express-validator");

const jobValidation = [
  body("title").notEmpty().withMessage("Job title is required"),

  body("company").notEmpty().withMessage("Company name is required"),

  body("location").notEmpty().withMessage("Location is required"),

  body("salary").notEmpty().withMessage("Salary is required"),

  body("description").notEmpty().withMessage("Description is required"),

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
  jobValidation,
};
