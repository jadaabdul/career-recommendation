const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const userController = require("./user.controller");

router.get("/profile", verifyToken, userController.getProfile);

router.put("/profile", verifyToken, userController.updateProfile);

module.exports = router;
