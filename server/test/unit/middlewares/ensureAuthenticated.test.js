const ensureAuthenticated = require("../../../src/middlewares/ensureAuthenticated");
const app = require("../../../src/app");
const InvalidAccessToken = require("../../../src/models/invalidAccessTokenModel");
const createUsersAndLogin = require("../../helpers/createUsersAndLogin");
const middlewareMock = require("../../helpers/middlewareMock");
const jwt = require("jsonwebtoken");
const User = require("../../../src/models/userModel");
const {TokenExpiredError, JsonWebTokenError} = jwt;

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Ensure Authenticated Middleware", () => {
  it("should attach user data and access token inside req object", async () => {
    jest.spyOn(InvalidAccessToken, "findOne").mockResolvedValue(null);
    jest.spyOn(jwt, "verify").mockReturnValue({token: "accessToken"});

    const mockUser = {
      id: "userId",
      likedSongs: ["song1", "song2"],
      library: ["album1", "album2"],
    };
    jest.spyOn(User, "findById").mockResolvedValue(mockUser);

    const {req, res, next} = middlewareMock(
      {
        cookies: {
          accessToken: "validAccessToken",
        },
      },
      {},
    );
    await ensureAuthenticated(req, res, next);

    expect(req.user).toHaveProperty("id");
    expect(req.user).toHaveProperty("likedSongs");
    expect(req.user).toHaveProperty("library");

    expect(req.accessToken).toHaveProperty("token");
    expect(req.accessToken).toHaveProperty("exp");
    expect(next).toHaveBeenCalled();
  });

  it("should fail if access token is missing", async () => {
    const {req, res, next} = middlewareMock({}, {});
    await ensureAuthenticated(req, res, next);

    expect(next.mock.calls[0][0]).toMatchObject({
      statusCode: 401,
      message: "Access token not found",
    });
  });

  it("should fail if access token is inside invalid access tokens list", async () => {
    jest
      .spyOn(InvalidAccessToken, "findOne")
      .mockResolvedValue({token: "invalidToken"});
    const {req, res, next} = middlewareMock(
      {
        cookies: {
          accessToken: "invalidAccessToken",
        },
      },
      {},
    );
    await ensureAuthenticated(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Access token invalid",
        statusCode: 401,
        code: "AccessTokenInvalid",
      }),
    );
  });

  it("should fail if access token is expired", async () => {
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new TokenExpiredError("jwt expired", Date.now());
    });

    const {req, res, next} = middlewareMock(
      {
        cookies: {
          accessToken: "expiredAccessToken",
        },
      },
      {},
    );
    await ensureAuthenticated(req, res, next);

    expect(res.statusCode).toEqual(401);
    expect(res._getJSONData()).toMatchObject({
      message: "Access token expired",
      code: "AccessTokenExpired",
    });
  });

  it("should fail if access token is invalid", async () => {
    jest.spyOn(InvalidAccessToken, "findOne").mockResolvedValue(null);
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new JsonWebTokenError("some jwt error");
    });

    const {req, res, next} = middlewareMock({
      cookies: {
        accessToken: "invalidAccessToken",
      },
    });
    await ensureAuthenticated(req, res, next);

    expect(res.statusCode).toEqual(401);
    expect(res._getJSONData()).toMatchObject({
      message: "Access token invalid",
      code: "AccessTokenInvalid",
    });
  });

  it("should fail if user does not exist", async () => {
    jest.spyOn(jwt, "verify").mockReturnValue({userId: "nonExistentUserId"});
    jest.spyOn(User, "findById").mockResolvedValue(null);

    const {req, res, next} = middlewareMock(
      {
        cookies: {
          accessToken: "validAccessToken",
        },
      },
      {},
    );
    await ensureAuthenticated(req, res, next);

    expect(1).toEqual(1);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 401,
        status: "fail",
        message: "The user belonging to this token does not exist",
      }),
    );
  });
});
