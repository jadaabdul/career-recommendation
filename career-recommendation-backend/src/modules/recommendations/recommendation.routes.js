const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const recommendationController = require("./recommendation.controller");

router.get("/jobs", verifyToken, recommendationController.jobs);

router.get("/courses", verifyToken, recommendationController.courses);

module.exports = router;
