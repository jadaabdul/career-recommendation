const skillService = require("./skill.service");

exports.create = async (req, res) => {
  try {
    const result = await skillService.create(req.body.skill_name);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await skillService.getAll();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.assignSkill = async (req, res) => {
  try {
    const result = await skillService.assignSkill(
      req.user.id,
      req.body.skill_id,
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.mySkills = async (req, res) => {
  try {
    const result = await skillService.mySkills(req.user.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeSkill = async (req, res) => {
  try {
    const result = await skillService.removeSkill(
      req.user.id,
      req.params.skillId,
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
