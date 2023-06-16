const bcrypt = require("bcryptjs");

const users = [
  {
    _id: "627d83892ec78c9f3bad0bdd",
    name: "Todd Clark",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    avatar: "https://reclarker-gallery.s3.us-west-2.amazonaws.com/soloTodd.jpg",
    isArtist: true,
    artistProfile: "6291329075672ed0cf4756f9",
    artistsFollowing: ["6291329075672ed0cf4756fc"],
  },
  {
    _id: "627d83892ec78c9f3bad0bde",
    name: "Joey Baloney",
    email: "baloney@example.com",
    password: bcrypt.hashSync("1234abcd", 10),
    artistsFollowing: [
      "6291329075672ed0cf4756f9",
      "6291329075672ed0cf4756fa",
      "6291329075672ed0cf4756fb",
      "6291329075672ed0cf4756fc",
    ],
    artworkWatching: [
      "62913936ced4b8d3f51e097a",
      "62913936ced4b8d3f51e0979",
      "62913936ced4b8d3f51e0978",
      "62913936ced4b8d3f51e0975",
      "62913936ced4b8d3f51e0974",
    ],
  },
  {
    _id: "627d83892ec78c9f3bad0bdf",
    name: "Jenna Jaloney",
    email: "jaloney@example.com",
    password: bcrypt.hashSync("123456", 10),
    artistsFollowing: [
      "6291329075672ed0cf4756f9",
      "6291329075672ed0cf4756fa",
      "6291329075672ed0cf4756fb",
      "6291329075672ed0cf4756fc",
    ],
    artworkWatching: [
      "62913936ced4b8d3f51e0971",
      "62913936ced4b8d3f51e0970",
      "62913936ced4b8d3f51e096f",
    ],
  },
  {
    _id: "627d83892ec78c9f3bad0be0",
    name: "Jon Jay",
    email: "admin2@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    isArtist: true,
    artistsFollowing: [
      "6291329075672ed0cf4756fb",
      "6291329075672ed0cf4756fc",
      "6291329075672ed0cf4756f9",
    ],
    avatar:
      "https://reclarker-gallery.s3.us-west-2.amazonaws.com/todd-funny.jpg",
    artistProfile: "6291329075672ed0cf4756fa",
  },
  {
    _id: "627d83892ec78c9f3bad0be1",
    name: "Darrold Dangold",
    email: "admin3@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    isArtist: true,
    artistsFollowing: ["6291329075672ed0cf4756fa", "6291329075672ed0cf4756f9"],
    avatar:
      "https://reclarker-gallery.s3.us-west-2.amazonaws.com/aerial8d960x311.jpg",
    artistProfile: "6291329075672ed0cf4756fb",
  },
  {
    _id: "628e9f5b8a4b5a36c0f03ac1",
    name: "Pierre Mountalgould",
    email: "admin4@example.com",
    password: bcrypt.hashSync("abc123", 10),
    isAdmin: true,
    isArtist: true,
    avatar:
      "https://reclarker-gallery.s3.us-west-2.amazonaws.com/lust604x241.jpg",
    artistProfile: "6291329075672ed0cf4756fc",
    artistsFollowing: ["6291329075672ed0cf4756f9", "6291329075672ed0cf4756fa"],
  },
];

module.exports = users;
