const artistService = require("../../../src/services/artistService");
const AppError = require("../../../src/utils/AppError");
const User = require("../../../src/models/userModel");
const mongoose = require("mongoose");

const CastError = mongoose.Error.CastError;

beforeEach(() => {
  jest.resetAllMocks();
});

describe("getArtistById", () => {
  it("should throw CastError if input id invalid", async () => {
    const error = await artistService
      .getArtistById({ artistId: "id" })
      .catch((e) => e);

    expect(error).toBeInstanceOf(CastError);
  });

  it("should throw 404 if user not found", async () => {
    jest.spyOn(User, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    const error = await artistService
      .getArtistById({ artistId: "id" })
      .catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Artist not found");
  });

  it("should throw 404 if user is not an artist", async () => {
    jest.spyOn(User, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        role: "user",
      }),
    });

    const error = await artistService
      .getArtistById({ artistId: "id" })
      .catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Artist not found");
  });

  it("should query user return their data", async () => {
    jest.spyOn(User, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        id: 1,
        name: "Coldplay",
        role: "artist",
      }),
    });

    const res = await artistService.getArtistById({ artistId: "coldplay" });

    expect(res).toMatchObject({
      id: 1,
      name: "Coldplay",
      role: "artist",
    });
  });
});
