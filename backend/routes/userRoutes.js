const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateUser,
  updateProfilePicture,
  getUsers,
  getUserById,
  deleteUser,
  updateUserArtistFollows,
  updateUserWatchlist,
} = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router.post("/login", authUser);
// to use middleware in a route set up like below use it as a first argument
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);
router
  .route("/:id/profile-picture")
  .put(protect, isAdmin, updateProfilePicture);
router
  .route("/:id/following/:artistId")
  .put(protect, isAdmin, updateUserArtistFollows);
router
  .route("/:id/watching/:artworkId")
  .put(protect, isAdmin, updateUserWatchlist);
module.exports = router;
