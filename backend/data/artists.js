const { faker } = require("@faker-js/faker");

const artists = [
  {
    _id: "6291329075672ed0cf4756f9",
    user: "627d83892ec78c9f3bad0bdd",
    biography: `Born in Washington D.C. in 1971 ${faker.lorem.paragraphs(4)}`,
    yearOfBirth: 1971,
    birthPlace: "Washington DC",
    awards: "Best Painting, Washington DC, 1989",
    style: "Modernist Painter",
    nationality: "American",
    artworkPicture:
      "https://reclarker-gallery.s3.us-west-2.amazonaws.com/1stStillLife.jpg",
    category: "628fdcfb416fa8a6f019da6b",
    artwork: [
      "62913936ced4b8d3f51e096a",
      "62913936ced4b8d3f51e097b",
      "62913936ced4b8d3f51e097a",
      "62913936ced4b8d3f51e0979",
      "62913936ced4b8d3f51e0978",
      "62913936ced4b8d3f51e0975",
      "62913936ced4b8d3f51e0974",
      "62913936ced4b8d3f51e0973",
    ],
    exhibitions: ["627d83892ec78c9f3bad0be9", "627d83892ec78c9f3bad0bed"],
    follows: 5,
  },
  {
    _id: "6291329075672ed0cf4756fa",
    user: "627d83892ec78c9f3bad0be0",
    biography: `Born in Prague in 1929. ${faker.lorem.paragraphs(4)}`,
    yearOfBirth: 1969,
    birthPlace: "Prague",
    nationality: "Bohemian",
    style: "Photography",
    artworkPicture:
      "https://reclarker-gallery.s3.us-west-2.amazonaws.com/cuban_laundry.jpg",
    category: "628fdcfb416fa8a6f019da6c",
    artwork: [
      "62913936ced4b8d3f51e0977",
      "62913936ced4b8d3f51e096d",
      "62913936ced4b8d3f51e096c",
    ],
    exhibitions: ["627d83892ec78c9f3bad0beb"],
    follows: 3,
  },
  {
    _id: "6291329075672ed0cf4756fb",
    user: "627d83892ec78c9f3bad0be1",
    biography: `Born in Portugal Spain in 1977, ${faker.lorem.paragraphs(4)}`,
    yearOfBirth: 1977,
    birthPlace: "Portugal, Spain",
    nationality: "Spanish",
    awards: "Best New Artist 2001, Portugal Times",
    style: "Aerial Photography",
    artworkPicture:
      "https://reclarker-gallery.s3.us-west-2.amazonaws.com/aerial8d960x311.jpg",
    category: "628fdcfb416fa8a6f019da70",
    artwork: [
      "62913936ced4b8d3f51e0972",
      "62913936ced4b8d3f51e0971",
      "62913936ced4b8d3f51e0970",
      "62913936ced4b8d3f51e096f",
      "62913936ced4b8d3f51e096e",
    ],
    exhibitions: ["627d83892ec78c9f3bad0bec"],
    follows: 3,
  },
  {
    _id: "6291329075672ed0cf4756fc",
    user: "628e9f5b8a4b5a36c0f03ac1",
    biography: `Born in Paris, France in 1999, ${faker.lorem.paragraphs(4)}`,
    yearOfBirth: 1999,
    birthPlace: "Paris, France",
    nationality: "French",
    awards: "Best New Artist 2018, Paris Exploristique",
    style: "Collage Photography",
    artworkPicture:
      "https://reclarker-gallery.s3.us-west-2.amazonaws.com/lust604x241.jpg",
    category: "628fdcfb416fa8a6f019da6e",
    artwork: ["62913936ced4b8d3f51e0976", "62913936ced4b8d3f51e096b"],
    exhibitions: ["627d83892ec78c9f3bad0bea"],
    follows: 4,
  },
];

module.exports = artists;
