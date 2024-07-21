const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  path: String,
});

const schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
  images: {
    type: [ImageSchema], // Store multiple images
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const product = mongoose.model("product", schema);
module.exports = product;
