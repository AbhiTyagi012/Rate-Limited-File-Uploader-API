/**
 * Extracts metadata from an uploaded file buffer.
 * Word count is calculated by splitting on any whitespace sequence,
 * which works correctly for both plain-text and CSV content.
 *
 * @param {Express.Multer.File} file
 * @returns {{ name: string, sizeBytes: number, wordCount: number }}
 */
function processFile(file) {
  const content = file.buffer.toString("utf-8");
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  return {
    name: file.originalname,
    sizeBytes: file.size,
    wordCount
  };
}

module.exports = { processFile };
