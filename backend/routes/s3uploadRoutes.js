const express = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Artwork = require("../models/Artwork");
const User = require("../models/User");

const { protect, isAdmin } = require("../middleware/authMiddleware");
const { uploadFile, getFileStream } = require("../controllers/s3Controller");

const router = express.Router();

// /api/uploads3/images/:key
router.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// /api/uploads3/images/:id
router.post(
  "/images/:id",
  upload.single("image"),
  protect,
  isAdmin,
  async (req, res) => {
    const file = req.file;
    const artwork = await Artwork.findById(req.params.id);

    // gather the artist and check if there is a profilePicture
    const artist = await User.findById(artwork.artist);

    const result = await uploadFile(file);
    await unlinkFile(file.path);
    console.log(result);

    const imageURL = `/api/uploads3/images/${result.Key}`;

    if (artist && !artist.profilePicture) {
      artist.profilePicture = imageURL;
      await artist.save();
    }

    if (artwork) {
      artwork.imageUrl = imageURL;
      artwork.fileName = file.originalname;
      artwork.uploadDate = Date.now();
      await artwork.save();

      res.status(201).json({ imagePath: `/api/uploads3/images/${result.Key}` });
    } else {
      res.status(404);
      throw new Error("Artwork does not exist");
    }
  }
);

module.exports = router;
