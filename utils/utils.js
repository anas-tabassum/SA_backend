const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const deleteFile = async (filename) => {
  const imagesFolderPath = path.join(__dirname, "../images");
  const imagePath = path.join(imagesFolderPath, filename);
  try {
    await unlinkAsync(imagePath);
    return true;
  } catch (err) {
    console.error("Error unlinking image:", err);
    throw err;
  }
};

module.exports = { deleteFile };
