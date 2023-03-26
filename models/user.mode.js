const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    pass: { type: String },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
