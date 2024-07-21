const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controller/controller");

let image_metadata = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { files: 6 },
}).array("images", 6);

router.post("/add", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(400)
          .json({ error: "Too many files to upload.", status: "limit" });
      }
      return res.status(400).json({ error: err.message, status: "limit" });
    } else if (err) {
      return res.status(500).json({ error: "File upload failed." });
    }

    if (req.files && req.files.length > 0) {
      const image_metadata = req.files.map((file) => {
        const { filename, originalname, mimetype, size, path } = file;
        return { filename, originalname, mimetype, size, path };
      });
      const data = { ...req.body, images: image_metadata };
      controller.addProduct(data, res);
    } else {
      res.status(400).json({ error: "No files to upload." });
    }
  });
});

router.get("/products", (req, res) => {
  const userId = req.query.id;
  controller.loadProducts(userId, res);
});

router.delete("/delete", (req, res) => {
  const id = req.query.id;
  controller.deleteProduct(id, res);
});

router.post("/login", (req, res) => {
  const data = req.body;
  controller.loginHandler(data, res);
});

module.exports = router;
