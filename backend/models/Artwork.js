const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const artworkSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      default: "Untitled",
    },
    fileName: {
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
    exhibition: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Exhibition",
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    height: {
      type: Number,
      required: true,
      default: 0,
    },
    width: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    year: {
      type: Number,
      required: true,
      default: 0,
    },
    location: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ArtType",
    },
    materials: {
      type: String,
      required: true,
      default: "None",
    },
    subject: {
      type: String,
      required: false,
    },
    uploadDate: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Artwork = mongoose.model("Artwork", artworkSchema);
