const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const todoModel = mongoose.model("todo", todoSchema);

module.exports = { todoModel };
