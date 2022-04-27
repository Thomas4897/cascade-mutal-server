const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    claimId: { type: String, required: true },
    userId: { type: String, require: true },
    creationDate: String,
    title: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("claim", claimSchema);
