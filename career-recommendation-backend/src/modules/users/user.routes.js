const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const isAdmin = require("../../middleware/admin.middleware");

const userController = require("./user.controller");

router.post("/", verifyToken, isAdmin, userController.createUser);

router.get("/", verifyToken, isAdmin, userController.getAllUsers);

router.put("/:id", verifyToken, isAdmin, userController.editUser);

router.delete("/:id", verifyToken, isAdmin, userController.removeUser);

router.get("/profile", verifyToken, userController.getProfile);

router.put("/profile", verifyToken, userController.updateProfile);



module.exports = router;
