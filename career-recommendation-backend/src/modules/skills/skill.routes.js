const express = require("express");

const router = express.Router();

const verifyToken = require("../../middleware/auth.middleware");

const skillController = require("./skill.controller");

router.post("/", verifyToken, skillController.create);

router.get("/", skillController.getAll);

router.put("/:id", verifyToken, skillController.update);

router.delete("/:id", verifyToken, skillController.remove);

router.post("/user-skill", verifyToken, skillController.assignSkill);

router.get("/my-skills", verifyToken, skillController.mySkills);

router.delete("/my-skills/:skillId", verifyToken, skillController.removeSkill);

module.exports = router;
