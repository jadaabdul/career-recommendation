const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const courseController = require("./course.controller");

const isAdmin = require("../../middleware/admin.middleware");

// router.post("/", verifyToken, courseController.create);
router.post("/", verifyToken, isAdmin, courseController.create);

router.get("/", courseController.getAll);

router.get("/:id", courseController.getOne);

// router.put("/:id", verifyToken, courseController.update);
router.put("/:id", verifyToken, isAdmin, courseController.update);

// router.delete("/:id", verifyToken, courseController.remove);
router.delete("/:id", verifyToken, isAdmin, courseController.remove);

module.exports = router;
