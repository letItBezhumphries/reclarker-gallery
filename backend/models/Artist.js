const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    biography: {
      type: String,
      required: false,
    },
    yearOfBirth: {
      type: Number,
      required: false,
    },
    birthPlace: {
      type: String,
      required: false,
    },
    nationality: {
      type: String,
      required: false,
    },
    awards: {
      type: String,
      required: false,
    },
    artworkPicture: {
      type: String,
      required: false,
    },
    style: {
      type: String,
      require: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "ArtType",
    },
    artwork: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Artwork",
      },
    ],
    exhibitions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Exhibition",
      },
    ],
    follows: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Artist = mongoose.model("Artist", artistSchema);
