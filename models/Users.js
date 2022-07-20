const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  __v: {
    type: String,
    select: false,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 40,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 6,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});
// Create a model for the userSchema users is the collection name
const User = mongoose.model("users", userSchema);

module.exports = User;
