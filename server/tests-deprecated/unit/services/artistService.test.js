const User = require("../../../src/models/userModel");
const artistService = require("../../../src/services/artistService");
const AppError = require("../../../src/utils/AppError");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("artist service", () => {
  it("should throw error if user does not exist", async () => {
    jest.spyOn(User, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });
    const error = await artistService
      .getArtistById({artistId: "id"})
      .catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Artist not found");
  });

  it("should throw error if user is not artist", async () => {
    jest.spyOn(User, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        role: "user",
      }),
    });
    const error = await artistService
      .getArtistById({artistId: "id"})
      .catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Artist not found");
  });

  it("should return artist details", async () => {
    jest.spyOn(User, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        id: "artistId",
        role: "artist",
        name: "Artist Name",
      }),
    });
    const artist = await artistService.getArtistById({artistId: "artistId"});

    expect(artist).toBeTruthy();
  });
});
