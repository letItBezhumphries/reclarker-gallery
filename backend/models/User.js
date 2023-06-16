const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    artistsFollowing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Artist",
      },
    ],
    artworkWatching: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Artwork",
      },
    ],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    isArtist: {
      type: Boolean,
      required: false,
      default: false,
    },
    artistProfile: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Artist",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model("User", userSchema);
