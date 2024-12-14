const express = require('express');
const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();
const path = require('path');

const { protect, isAdmin } = require('../middleware/authMiddleware');

const User = require('../models/User');
const Artwork = require('../models/Artwork');

const region = process.env.AWS_REGION;
const bucketName = process.env.BUCKETNAME;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, callback) {
  // creating an expression of the fileTypes that are acceptable
  const fileTypes = /jpg|jpeg|png/;
  // this extname will either be true or false if it doesn't match against the fileTypes
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // need to check the mimeType
  const mimetype = fileTypes.test(file.mimetype);

  // want to check that both of these are true before moving forward with calling callback function
  if (extname && mimetype) {
    return callback(null, true);
  } else {
    callback('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const uploadToS3 = multer({
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: bucketName,
    metadata: function (req, file, callback) {
      callback(null, { fieldName: 'TESTING METADATA' });
    },
    key: function (req, file, callback) {
      callback(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
    limits: { fileSize: 2000000 },
  }),
});

const singleUpload = uploadToS3.single('image');

// /api/upload/:id
router.post('/:id', upload.single('image'), (req, res) => {
  console.log('in post request uploadImageRoutes the file:', req.file);
  res.send(`/${req.file.path}`);
});

// /api/upload/profile/:id
router.post('/profile/:id', protect, (req, res) => {
  const userId = req.params.id;

  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: 'Image Upload Error',
          detail: err.message,
          error: err,
        },
      });
    }

    let update = { profilePicture: req.file.location };

    console.log('in post uploadImageRountes req.file.location:', update);

    User.findByIdAndUpdate(userId, update, { new: true })
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).json(err));
  });
});

module.exports = router;
