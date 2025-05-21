const mongoose = require("mongoose");
const getPlaylist = require("../../../../src/services/playlist/getPlaylist");
const Playlist = require("../../../../src/models/playlistModel");
const AppError = require("../../../../src/utils/AppError");

const CastError = mongoose.Error.CastError;

describe("getPlaylist", () => {
  it("should throw CastError if id is invalid", async () => {
    const error = await getPlaylist({ playlistId: "123" }).catch((e) => e);

    expect(error).toBeInstanceOf(CastError);
  });

  it("should throw 404 if playlist does not exist", async () => {
    jest.spyOn(Playlist, "findById").mockReturnValue({
      select: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      }),
    });

    const error = await getPlaylist({ playlistId: "123" }).catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      statusCode: 404,
      status: "fail",
      message: `Playlist not found`,
    });
  });

  it("should throw 404 if playlist is private or not owned by user", async () => {
    jest.spyOn(Playlist, "findById").mockReturnValue({
      select: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          isPublic: false,
          user: { id: "abc" },
        }),
      }),
    });

    const error = await getPlaylist({ playlistId: "123", userId: "efg" }).catch(
      (e) => e,
    );

    expect(error).toBeInstanceOf(AppError);
    expect(error).toMatchObject({
      statusCode: 404,
      status: "fail",
      message: `Playlist not found`,
    });
  });

  it("should return playlist data", async () => {
    jest.spyOn(Playlist, "findById").mockReturnValue({
      select: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          id: "123",
          user: { id: "abc" },
        }),
      }),
    });

    const res = await getPlaylist({ playlistId: "123", userId: "abc" });

    console.log(res);

    expect(res).toMatchObject({
      id: "123",
      user: { id: "abc" },
      isPublic: undefined,
    });
  });
});
