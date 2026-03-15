const { processFile } = require("./upload.service");

function handleUpload(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided. Send a .txt or .csv file in the 'file' field." });
  }

  const result = processFile(req.file);
  return res.status(200).json(result);
}

module.exports = { handleUpload };
