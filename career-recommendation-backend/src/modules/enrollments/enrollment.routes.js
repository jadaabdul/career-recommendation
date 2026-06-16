const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const enrollmentController = require("./enrollment.controller");

router.post("/enroll", verifyToken, enrollmentController.enroll);

router.get("/my-courses", verifyToken, enrollmentController.myCourses);

module.exports = router;
