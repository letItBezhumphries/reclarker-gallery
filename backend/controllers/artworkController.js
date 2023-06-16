const asyncHandler = require("express-async-handler");
const Artwork = require("../models/Artwork");
const User = require("../models/User");

// @desc:  fetch all artwork
// @route:  GET /api/artwork
// @access:  Public
const getArtwork = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Artwork.countDocuments({ ...keyword });
  const artworks = await Artwork.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("artist", "name");
  console.log("artwork from getArtwork:", artworks);
  res.json({ artworks, page, pages: Math.ceil(count / pageSize) });
});

// @desc:  fetch single artwork
// @route:  GET /api/artwork/:id
// @access:  Public
const getArtworkById = asyncHandler(async (req, res) => {
  const artwork = await Artwork.findById(req.params.id).populate(
    "artist",
    "name"
  );
  console.log("artwork controller, getArtworkById results:", artwork);

  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404);
    throw new Error("Artwork not found");
  }
});

// @desc:  delete a single artwork
// @route:  DELETE /api/artwork/:id
// @access:  Private/Admin
const deleteArtwork = asyncHandler(async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);

  // could put check here to see if the req.user._id is equal to the artwork.user._id
  // to make sure only the admin that added the artwork would be able to delete that artwork
  // the below check allows all admin to delete any artwork
  if (artwork) {
    await artwork.remove();
    res.json({
      message: `The Artwork with an id: ${req.params.id} has successfully been removed`,
    });
  } else {
    res.status(404);
    throw new Error("Artwork not found");
  }
});

// @desc:  Create an artwork
// @route:  POST /api/artwork
// @access:  Private/Admin
const createArtwork = asyncHandler(async (req, res) => {
  const artwork = new Artwork({
    title: "Sample Title",
    price: 0,
    fileName: "samplefile.jpg",
    artist: req.user._id,
    imageUrl: "/images/sample.jpg",
    height: 0,
    width: 0,
    year: 0,
    location: "sample location",
    type: "sample type",
    materials: "sample materials",
    description: "Sample description",
    numReviews: 0,
    subject: "sample subject",
  });

  const createdArtwork = await artwork.save();
  const result = { ...createdArtwork, artist: req.user.name };
  console.log("inside createArtwork controller:", result);
  res.status(201).json(result);
});

// @desc:  Update an artwork
// @route:  PUT /api/artwork/:id
// @access:  Private/Admin
const updateArtwork = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    description,
    imageUrl,
    fileName,
    height,
    width,
    countInStock,
    year,
    location,
    type,
    materials,
    subject,
  } = req.body;

  const artwork = await Artwork.findById(req.params.id).populate(
    "artist",
    "name"
  );

  if (artwork) {
    artwork.title = title;
    artwork.price = price;
    artwork.description = description;
    artwork.imageUrl = imageUrl;
    artwork.fileName = fileName;
    artwork.height = height;
    artwork.width = width;
    artwork.year = year;
    artwork.location = location;
    artwork.countInStock = countInStock;
    artwork.type = type;
    artwork.materials = materials;
    artwork.subject = subject;

    const updatedArtwork = await artwork.save();

    const result = { ...updatedArtwork, artist: req.user.name };
    console.log("in the update artwork controller -> the result:", result);
    res.json(result);
  } else {
    res.status(404);
    throw new Error("Artwork not found");
  }
});

// @desc:  Create new artwork review
// @route:  POST /api/artwork/:id/reviews
// @access:  Private
const createArtworkReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // req.params.id for determining which product the review is for
  const artwork = await Artwork.findById(req.params.id);

  if (artwork) {
    // check to see if user has already submitted a review for product
    const alreadyReviewed = artwork.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Artwork already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    artwork.reviews.push(review);
    artwork.numReviews = artwork.reviews.length;

    artwork.rating =
      artwork.reviews.reduce((acc, review) => review.rating + acc, 0) /
      artwork.reviews.length;

    await artwork.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Artwork not found");
  }
});

// @desc:  get top rated Artwork
// @route:  GET /api/artwork/top
// @access:  Public
const getTopRatedArtwork = asyncHandler(async (req, res) => {
  const artworks = await Artwork.find({})
    .sort({ rating: -1 })
    .limit(5)
    .populate("artist", "name");
  // console.log("in getTopRatedArtwork, artworks:", artworks);
  res.json(artworks);
});

// @route GET /api/artwork/s?title=
// @desc fetches single artwork details by searching title
// @access public
const getArtworkBySearchTitle = asyncHandler(async (req, res) => {
  const title = req.query.title
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  console.log("artwork controller, getArtworkBySearchTitle title:", title);

  const artwork = await Artwork.find({ ...title }).populate("artist", "name");

  if (artwork) {
    console.log(
      "artwork controller, getArtworkBySearchTitle results:",
      artwork
    );
    res.status(200).json(artwork);
  } else {
    res.status(404);
    throw new Error("Artwork Title not found");
  }
});

// @route GET /api/artwork/exhibition?exhibition=exhibition&pageNumber=pageNumber
// @desc gets artwork search by collection title
// @access public
const getArtworkByExhibition = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const exhibition = req.query.exhibition
    ? {
        exhibition: {
          $regex: req.query.exhibition,
          $options: "i",
        },
      }
    : {};

  const count = await Artwork.countDocuments({ ...exhibition });
  const artwork = await Artwork.find({ ...exhibition })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("artist", "name");

  if (artwork) {
    console.log("artwork controller, getArtworkByExhibition results:", artwork);
    res.json({ artwork, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("Artwork Exhibition not found");
  }
});

// @route GET /api/artwork/artist
// @desc gets artwork list from searching by artist name
// @access public
const getArtworkByArtistSearch = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const artist = req.query.artist
    ? {
        artist: {
          name: {
            $regex: req.query.artist,
            $options: "i",
          },
        },
      }
    : {};

  const count = await Artwork.countDocuments({ ...artist });
  const artwork = await Artwork.find({ ...artist })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("artist", "name");

  if (artwork) {
    console.log(
      "artwork controller, getArtworkByArtistSearch results:",
      artwork
    );
    res.status(200).json({ artwork, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("Artist not found");
  }
});

// @route GET /api/artwork/s?type
// @desc gets all artwork from search by the type
// @access public
const getArtworkByArtType = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const type = req.query.type
    ? {
        type: {
          $regex: req.query.type,
          $options: "i",
        },
      }
    : {};

  const count = await Artwork.countDocuments({ ...type });
  const artwork = await Artwork.find({ ...type })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("artist", "name");

  if (artwork) {
    console.log("artwork controller, getArtworkByType results:", artwork);
    res.status(200).json({ artwork, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("Art Type not found");
  }
});

// @route GET /api/artwork/s?min=min&max=max  set up for a range search
// @desc gets all images/artwork from search by price range
// @access public
// const getArtworkByPriceRange = asyncHandler(async (req, res) => {

// });

module.exports = {
  getArtwork,
  getTopRatedArtwork,
  getArtworkById,
  deleteArtwork,
  createArtwork,
  updateArtwork,
  createArtworkReview,
  getArtworkBySearchTitle,
  getArtworkByExhibition,
  getArtworkByArtistSearch,
  getArtworkByArtType,
};
