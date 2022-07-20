const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  __v: {
    type: Number,
    select: false,
  },

  name: {
    type: String,

    min: 2,
    max: 255,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Role", roleSchema);
