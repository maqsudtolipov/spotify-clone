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
    },
    isLikedSongs: {
      type: Boolean,
      default: false,
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
