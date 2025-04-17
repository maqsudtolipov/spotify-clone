const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 2 characters long"],
      maxLength: [24, "Name must be at most 30 characters long"],
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: [true, "Please provide a song file"],
    },
    img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: [true, "Please provide a img file"],
    },
    duration: {
      type: Number,
      required: [true, "Please provide a duration"],
    },
    plays: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const Song = new mongoose.model("Song", songSchema);
module.exports = Song;
