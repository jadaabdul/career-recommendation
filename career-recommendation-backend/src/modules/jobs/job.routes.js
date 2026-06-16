const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const isAdmin = require("../../middleware/admin.middleware");

const { jobValidation } = require("../../middleware/validation/job.validation");

const jobController = require("./job.controller");

router.post("/", verifyToken, isAdmin, jobValidation, jobController.create);

router.get("/", jobController.getAll);

router.get("/:id", jobController.getOne);

router.post("/:jobId/skills", verifyToken, isAdmin, jobController.assignSkill);

router.get("/:jobId/skills", jobController.jobSkills);

module.exports = router;
