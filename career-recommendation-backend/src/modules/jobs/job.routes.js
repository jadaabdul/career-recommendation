const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const jobController = require("./job.controller");

const isAdmin = require("../../middleware/admin.middleware");

router.post("/", verifyToken, isAdmin, jobController.create);

router.get("/", jobController.getAll);

router.get("/:id", jobController.getOne);

router.post("/:jobId/skills", verifyToken, isAdmin, jobController.assignSkill);

router.get("/:jobId/skills", jobController.jobSkills);

module.exports = router;
