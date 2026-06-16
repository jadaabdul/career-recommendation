const express = require("express");

const router = express.Router();

const categoryController = require("./category.controller");

const verifyToken = require("../../middleware/auth.middleware");

const isAdmin = require("../../middleware/admin.middleware");

router.post("/", verifyToken, isAdmin, categoryController.create);

router.get("/", categoryController.getAll);

router.put("/:id", verifyToken, isAdmin, categoryController.update);

router.delete("/:id", verifyToken, isAdmin, categoryController.remove);

module.exports = router;
