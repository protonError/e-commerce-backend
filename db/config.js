const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/e-commerce");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${process.env.MONGO_URI}`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
