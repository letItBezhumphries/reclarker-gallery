const asyncHandler = require("express-async-handler");
const Exhibition = require("../models/Exhibition");

// @desc:  fetch all exhibits
// @route:  GET /api/exhibits
// @access:  Public
const getExhibits = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Exhibition.countDocuments({ ...keyword });
  const exhibits = await Exhibition.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  console.log("exhibitions from getExhibits:", exhibits);
  res.json({ exhibits, page, pages: Math.ceil(count / pageSize) });
});

// @desc:  fetch single exhibit
// @route:  GET /api/exhibits/:id
// @access:  Public
const getExhibitById = asyncHandler(async (req, res) => {
  const exhibit = await Exhibition.findById(req.params.id);

  if (exhibit) {
    res.json(exhibit);
  } else {
    res.status(404);
    throw new Error("Exhibit not found");
  }
});

// @desc:  delete a single exhibit
// @route:  DELETE /api/exhibits/:id
// @access:  Private/Admin
const deleteExhbit = asyncHandler(async (req, res) => {
  const exhibit = await Exhibition.findById(req.params.id);

  // could put check here to see if the req.user._id is equal to the artwork.user._id
  // to make sure only the admin that added the artwork would be able to delete that artwork
  // the below check allows all admin to delete any artwork
  if (exhibit) {
    await exhibit.remove();
    res.json({
      message: `The Exhibit with an id: ${req.params.id} has successfully been removed`,
    });
  } else {
    res.status(404);
    throw new Error("Exhibit not found");
  }
});

// @desc:  Create an exhibit
// @route:  POST /api/exhibits
// @access:  Private/Admin
const createExhibit = asyncHandler(async (req, res) => {
  const exhibit = new Exhibition({
    title: "Sample Title",
    subTitle: "Sample subtitle",
    image: "sample.jpg",
    user: req.user._id,
    description: "Sample description",
    location: {
      address: "sample address",
      city: "sample city",
      postalCode: "sample code",
      country: "sample country",
    },
    startDate: "sample start date",
    endDate: "sample end date",
    showTimes: "sample showtimes",
  });

  const createdExhibit = await exhibit.save();
  res.status(201).json(createdExhibit);
});

// @desc:  Update an exhibit
// @route:  PUT /api/exhibits/:id
// @access:  Private/Admin
const updateExhibit = asyncHandler(async (req, res) => {
  const {
    title,
    subTitle,
    description,
    image,
    location,
    startDate,
    endDate,
    showTimes,
  } = req.body;

  const exhibit = await Exhibition.findById(req.params.id);

  if (exhibit) {
    exhibit.title = title;
    exhibit.subTitle = subTitle;
    exhibit.user = req.user._id;
    exhibit.description = description;
    exhibit.image = image;
    exhibit.location = location;
    exhibit.startDate = startDate;
    exhibit.endDate = endDate;
    exhibit.showTimes = showTimes;

    const updatedExhibit = await exhibit.save();
    res.json(updatedExhibit);
  } else {
    res.status(404);
    throw new Error("Exhibit not found");
  }
});

module.exports = {
  getExhibits,
  getExhibitById,
  createExhibit,
  updateExhibit,
  deleteExhbit,
};
