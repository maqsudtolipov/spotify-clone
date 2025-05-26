const mongoose = require("mongoose");
const updatePlaylist = require("../../../../src/services/playlist/updatePlaylist");
const Playlist = require("../../../../src/models/playlistModel");
const AppError = require("../../../../src/utils/AppError");

jest.mock("../../../../src/utils/uploadFiles");

const uploadFiles = require("../../../../src/utils/uploadFiles");

const CastError = mongoose.Error.CastError;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("updatePlaylist", () => {
  it("should throw CastError if id is invalid", async () => {
    const error = await updatePlaylist({ playlistId: "123" }).catch((e) => e);

    expect(error).toBeInstanceOf(CastError);
  });

  it("should return throw 404 if playlist does not exist", async () => {
    jest.spyOn(Playlist, "findById").mockReturnValue({
      select: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      }),
    });

    const error = await updatePlaylist({ playlistId: "123" }).catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      statusCode: 404,
      status: "fail",
      message: "Playlist not found",
    });
  });

  it("should return throw 404 if playlist it not owned by user", async () => {
    jest.spyOn(Playlist, "findById").mockReturnValue({
      select: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          id: "123",
          user: { id: "456" },
        }),
      }),
    });

    const error = await updatePlaylist({
      playlistId: "123",
      userId: "123",
    }).catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      statusCode: 404,
      status: "fail",
      message: "Playlist not found",
    });
  });

  it("should throw 403 is playlist is restricted", async () => {
    jest.spyOn(Playlist, "findById").mockReturnValue({
      select: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          id: "123",
          user: { id: "123" },
          isLikedSongs: true,
        }),
      }),
    });

    const error = await updatePlaylist({
      playlistId: "123",
      userId: "123",
    }).catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      statusCode: 403,
      status: "fail",
      message: "You don't have permission to perform this action",
    });
  });

  it("should update playlist and return new data", async () => {
    // Review after upload uploadFiles logic
  });
});
