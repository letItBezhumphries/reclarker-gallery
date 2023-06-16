const mongoose = require("mongoose");

const exhibitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    galleryName: {
      type: String,
      required: true,
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    showTimes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Exhibition = mongoose.model("Exhibition", exhibitionSchema);
