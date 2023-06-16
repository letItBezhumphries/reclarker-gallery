const express = require("express");
const router = express.Router();

const {
  getAllArtists,
  getMostFollowed,
  getArtistById,
} = require("../controllers/artistController");

router.route("/").get(getAllArtists);
router.route("/popular").get(getMostFollowed);
router.route("/:id").get(getArtistById);

module.exports = router;
