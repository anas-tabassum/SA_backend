const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  username: String,
  password: String,
});

const product = mongoose.model("user", schema);
module.exports = product;
