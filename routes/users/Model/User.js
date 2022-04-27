const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    claimHistory: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
