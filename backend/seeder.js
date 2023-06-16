const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");
const users = require("./data/users");
const artwork = require("./data/artwork");
const exhibitions = require("./data/exhibitions");
const artTypes = require("./data/artTypes");
const artists = require("./data/artists");

/**
 * models
 */
const User = require("./models/User");
const Artwork = require("./models/Artwork");
const Exhibition = require("./models/Exhibition");
const ArtType = require("./models/ArtType");
const Artist = require("./models/Artist");

const connectDB = require("./mongo/index");

connectDB();

const importData = async () => {
  try {
    await Exhibition.deleteMany();
    await Artwork.deleteMany();
    await User.deleteMany();
    await Artist.deleteMany();
    await ArtType.deleteMany();

    await ArtType.insertMany(artTypes);
    await User.insertMany(users);
    await Artist.insertMany(artists);
    await Artwork.insertMany(artwork);
    await Exhibition.insertMany(exhibitions);

    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await Order.deleteMany();
    await Exhibition.deleteMany();
    await Artwork.deleteMany();
    await User.deleteMany();
    await Artist.deleteMany();
    await ArtType.deleteMany();

    console.log("Data destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  // importCategories();
  importData();
}
