const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = require("../middleware/multerConfig");
const { rateLimiter } = require("../middleware/rateLimiter");
const { handleUpload } = require("./upload.controller");

/**
 * POST /api/upload
 * Accepts a single file in the "file" field (multipart/form-data).
 * Rate limited to 5 uploads per minute per IP.
 */
router.post(
  "/",
  rateLimiter,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({ message: "File too large. Maximum allowed size is 5 MB." });
        }
        return res.status(400).json({ message: err.message });
      }
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  handleUpload
);

module.exports = router;
