const multer = require("multer");
const path = require("path");

const ALLOWED_EXTENSIONS = [".txt", ".csv"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// Keep the file in memory — no disk writes needed
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(new Error("Only .txt and .csv files are allowed"));
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE_BYTES }
});

module.exports = upload;
