const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  getExhibits,
  getExhibitById,
  createExhibit,
  updateExhibit,
  deleteExhbit,
} = require("../controllers/exhibitController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.route("/").get(getExhibits).post(protect, isAdmin, createExhibit);
router
  .route("/:id")
  .get(getExhibitById)
  .put(protect, isAdmin, updateExhibit)
  .delete(protect, isAdmin, deleteExhbit);

module.exports = router;
