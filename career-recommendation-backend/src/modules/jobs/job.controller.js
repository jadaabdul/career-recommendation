const jobService = require("./job.service");

exports.create = async (req, res) => {
  try {
    const result = await jobService.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const search = req.query.search || "";

    const page = req.query.page || 1;

    const limit = req.query.limit || 5;

    const result = await jobService.getAll(search, page, limit);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const result = await jobService.getOne(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.assignSkill = async (req, res) => {
  try {
    const result = await jobService.assignSkill(
      req.params.jobId,
      req.body.skill_id,
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.jobSkills = async (req, res) => {
  try {
    const result = await jobService.jobSkills(req.params.jobId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await jobService.update(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await jobService.remove(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
