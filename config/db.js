require("dotenv").config();

const mongoURI = process.env.MONGO_URI;
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (error) {
    throw error;
  }
};

module.exports = connectToDatabase;
