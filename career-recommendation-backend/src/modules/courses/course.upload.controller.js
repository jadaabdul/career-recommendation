exports.uploadThumbnail = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  res.status(200).json({
    message: "Thumbnail Uploaded Successfully",

    file: req.file.filename,
  });
};
