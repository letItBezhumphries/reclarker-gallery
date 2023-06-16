// const asyncHandler = require("express-async-handler");
const fs = require("fs");
const util = require("util");
const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
// const multer = require("multer");
// const multers3 = require("multer-s3");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
// const unlinkFile = util.promisify(fs.unlink);

const region = process.env.region;
const bucketName = process.env.bucketName;
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  // signatureVersion: "v4",
});

// generates a secure s3 presigned url to upload file to s3 directly
// @desc:  get presigned s3 url
// @route:  GET /api/upload
// @access:  Private/Admin
const generateUploadURL = asyncHandler(async (req, res) => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 360,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  res.json(uploadURL);
});

module.exports = {
  generateUploadURL,
};
