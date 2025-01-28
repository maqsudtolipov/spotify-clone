const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        pathRef: "docModel",
      },
    ],
    docModel: {
      type: String,
      required: true,
      enum: ["Playlist", "User"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const Library = mongoose.model("Library", librarySchema);
module.exports = Library;
