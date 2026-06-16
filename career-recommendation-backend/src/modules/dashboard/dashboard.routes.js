const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const isAdmin = require("../../middleware/admin.middleware");

const dashboardController = require("./dashboard.controller");

router.get("/stats", verifyToken, isAdmin, dashboardController.stats);

module.exports = router;
