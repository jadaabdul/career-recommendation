const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const isAdmin = require("../../middleware/admin.middleware");

const upload = require("../../middleware/upload.middleware");

const {
  courseValidation,
} = require("../../middleware/validation/course.validation");

const courseController = require("./course.controller");

const uploadController = require("./course.upload.controller");

/* Upload Thumbnail */

router.post(
  "/upload",
  verifyToken,
  isAdmin,
  upload.single("thumbnail"),
  uploadController.uploadThumbnail,
);

/* Course CRUD */

router.post(
  "/",
  verifyToken,
  isAdmin,
  courseValidation,
  courseController.create,
);

router.get("/", courseController.getAll);

router.get("/:id", courseController.getOne);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  courseValidation,
  courseController.update,
);

router.delete("/:id", verifyToken, isAdmin, courseController.remove);

module.exports = router;
