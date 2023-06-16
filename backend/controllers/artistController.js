const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Artwork = require("../models/Artwork");

// @desc:  fetch all artists
// @route:  GET /api/artists
// @access:  Public
const getAllArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find({}).populate({
    path: "user",
    select: "name avatar",
  });

  console.log("All the artists, in getAllArtists controller:", artists);

  if (artists) {
    res.status(200).json(artists);
  } else {
    res.status(400);
    throw new Error("There are no Artists");
  }
});

// @desc:  fetch artist details by id
// @route:  GET /api/artists/:id
// @access:  Public
const getArtistById = asyncHandler(async (req, res) => {
  const artist = await Artist.findById(req.params.id)
    .populate("user", "name avatar")
    .populate("artwork")
    .populate("exhibitions");

  if (artist) {
    res.status(200).json(artist);
  } else {
    res.status(400);
    throw new Error("Artist does not exist");
  }
});

// @desc:  fetch the most followed artists
// @route:  GET /api/artists/popular
// @access:  Public
const getMostFollowed = asyncHandler(async (req, res) => {
  const mostFollowed = await Artist.find({})
    .sort({ follows: -1 })
    .limit(4)
    .populate("user", "name avatar");

  if (mostFollowed) {
    res.status(200).json(mostFollowed);
  } else {
    res.status(400);
    throw new Error("There are no artists being followed");
  }
});

module.exports = {
  getAllArtists,
  getArtistById,
  getMostFollowed,
};
