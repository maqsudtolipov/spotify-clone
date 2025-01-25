const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a playlist name"],
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [24, "Name must be at most 24 characters long"],
    },
    description: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [50, "Name must be at most 50 characters long"],
    },
    img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: [true, "Please provide a playlist img"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
      select: false,
    },
    isLikedSongs: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const Playlist = new mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
