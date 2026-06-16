const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");

const {
  registerValidation,
  loginValidation,
} = require("../../middleware/validation/auth.validation");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User Registered
 */
router.post("/register", registerValidation, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login Successful
 */
router.post("/login", loginValidation, authController.login);

module.exports = router;
