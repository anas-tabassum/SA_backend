require("dotenv").config();
const connectToDatabase = require("./config/db.js");
const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

const imagesDirectory = path.join(__dirname, "images");

app.use(cors());

app.use("/images", express.static(imagesDirectory));
app.use(express.json({ limit: "10mb" }));
app.use("/", routes);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {});
  })
  .catch((err) => {
    console.log("Database connection failed!", err);
  });
