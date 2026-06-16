const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");

const userRoutes = require("../modules/users/user.routes");

const categoryRoutes = require("../modules/categories/category.routes");

const courseRoutes = require("../modules/courses/course.routes");

const enrollmentRoutes = require("../modules/enrollments/enrollment.routes");

const skillRoutes = require("../modules/skills/skill.routes");

const jobRoutes = require("../modules/jobs/job.routes");

const recommendationRoutes = require("../modules/recommendations/recommendation.routes");

const dashboardRoutes = require("../modules/dashboard/dashboard.routes");

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/categories", categoryRoutes);

router.use("/courses", courseRoutes);

router.use("/enrollments", enrollmentRoutes);

router.use("/skills", skillRoutes);

router.use("/jobs", jobRoutes);

router.use("/recommendations", recommendationRoutes);

router.use("/dashboard", dashboardRoutes);

module.exports = router;
