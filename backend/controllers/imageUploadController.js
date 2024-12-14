const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multers3 = require('multer-s3');
require('dotenv').config();
const path = require('path');
const url = require('url');

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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multers3({
    acl: 'public-read',
    s3,
    bucket: bucketName,
    metadata: function (req, file, callback) {
      callback(null, { fieldName: 'TESTING METADATA' });
    },
    key: function (req, file, callback) {
      callback(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
    limits: { fileSize: 2000000 },
  }),
});

module.exports = upload;
