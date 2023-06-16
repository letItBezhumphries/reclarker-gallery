const mongoose = require("mongoose");

const artTypeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ArtType = mongoose.model("ArtType", artTypeSchema);
