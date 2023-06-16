const express = require("express");
const router = express.Router();
// const multer = require("multer");
const {
  getArtwork,
  getTopRatedArtwork,
  getArtworkById,
  deleteArtwork,
  createArtwork,
  updateArtwork,
  createArtworkReview,
  getArtworkByArtistSearch,
  getArtworkByExhibition,
  getArtworkByArtType,
  getArtworkBySearchTitle,
} = require("../controllers/artworkController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

//  /api/artwork
router.route("/").get(getArtwork).post(protect, isAdmin, createArtwork);
router.route("/:id/reviews").post(protect, createArtworkReview);
router.get("/top", getTopRatedArtwork);
router.route("/artist").get(getArtworkByArtistSearch);
router.route("/exhibition").get(getArtworkByExhibition);
router.route("/s").get(getArtworkBySearchTitle);
router
  .route("/:id")
  .get(getArtworkById)
  .delete(protect, isAdmin, deleteArtwork)
  .put(protect, isAdmin, updateArtwork);

module.exports = router;
