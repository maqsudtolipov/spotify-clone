const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    items: [
      {
        _id: false,
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "itemType",
          required: [true, "Please provide a refId"],
          unique: [true, "Item already exists"],
        },
        itemType: {
          type: String,
          required: [true, "Item type is required: Playlist or Artist"],
          enum: ["Playlist", "Artist"],
        },
        isPinned: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const Library = mongoose.model("Library", librarySchema);
module.exports = Library;
