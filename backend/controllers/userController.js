const asyncHandler = require("express-async-handler");
const generateToken = require("../utility/generateToken");
const upload = require("./imageUploadController");
const User = require("../models/User");
const Artist = require("../models/Artist");
const Artwork = require("../models/Artwork");
const singleUpload = upload.single("image");

// @desc:  Auth user & get token
// @route:  POST /api/users/login
// @access:  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("in controller email and password:", email, password);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc:  Register a new user
// @route:  POST /api/users
// @access:  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc:  Get user profile
// @route:  GET /api/users/profile
// @access:  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc:  Update user profile
// @route:  PUT /api/users/profile
// @access:  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc:  Get all users
// @route:  GET /api/users
// @access:  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// @desc:  delete user by id
// @route:  DELETE /api/users/:id
// @access:  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: `user with id: ${req.params.id} has been removed` });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc:  Get user by ID
// @route:  GET /api/users/:id
// @access:  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc:  Update user
// @route:  PUT /api/users/:id/
// @access:  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc:  Update user profile picture
// @route:  PUT /api/users/:id/profile-picture
// @access:  Private
const updateProfilePicture = asyncHandler((req, res) => {
  const userId = req.params.id;

  singleUpload(req, res, async function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    const user = await User.findById(userId);

    if (user) {
      user.profilePicture = req.file.location || user.profilePicture;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        profilePicture: updatedUser.profilePicture,
      });
    }
  });
});

// @desc:  Update user's list of artists that they follow
// @route:  PUT /api/users/:id/following/:artistId
// @access:  Private
const updateUserArtistFollows = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const artist = await Artist.findById(req.params.artistId);

  if (user && artist) {
    // add the artist id to the following list for user
    user.artistsFollowing.push(req.body.artistFollowing);

    const updatedUser = await user.save();
    // increment the artist follows count by 1
    artist.follows = artist.follows + 1;

    await artist.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      artistsFollowing: updatedUser.artistsFollowing,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc:  Update user's list of artwork that they are watching
// @route:  PUT /api/users/:id/watching/:artworkId
// @access:  Private
const updateUserWatchlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const artwork = await Artwork.findById(req.params.artworkId);

  if (user && artwork) {
    // add the artist id to the following list for user
    user.artworkWatching.push(req.params.artworkId);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      artworkWatching: updatedUser.artworkWatching,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateProfilePicture,
  updateUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUserArtistFollows,
  updateUserWatchlist,
};
