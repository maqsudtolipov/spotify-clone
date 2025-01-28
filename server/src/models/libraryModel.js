const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        pathRef: "docModel",
      },
    ],
    docModel: {
      type: String,
      required: [true, "Item type is required"],
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
