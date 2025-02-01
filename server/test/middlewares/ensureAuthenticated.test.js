const mongoose = require("mongoose");
const request = require("supertest");
const httpMocks = require("node-mocks-http");
const jwt = require("jsonwebtoken");
const ensureAuthenticated = require("../../src/middlewares/ensureAuthenticated");
const app = require("../../src/app");
const User = require("../../src/models/userModel");
const InvalidAccessToken = require("../../src/models/invalidAccessTokenModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const {
  cleanupDatabaseAndDisconnect,
  connectToDatabase,
} = require("../helpers/databaseHelpers");
const createUsersAndLogin = require("../helpers/createUsersAndLogin");
const middlewareMock = require("../helpers/middlewareMock");

let server;
beforeAll(async () => {
  await connectToDatabase();
  server = app.listen(3009);
});

afterAll(async () => {
  await cleanupDatabaseAndDisconnect();
  server.close();
});

describe("Ensure Authenticated Middleware", () => {
  let loggedInUsers;

  beforeAll(async () => {
    loggedInUsers = await createUsersAndLogin(1);
  });

  it("should attach user data and access token inside req object", async () => {
    const { req, res, next } = middlewareMock(
      {
        cookies: {
          accessToken: loggedInUsers[0].accessToken,
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
    const { req, res, next } = middlewareMock({}, {});
    await ensureAuthenticated(req, res, next);

    expect(next.mock.calls[0][0]).toMatchObject({
      statusCode: 401,
      message: "Access token not found",
    });
  });

  it("should fail if access token is inside invalid access tokens list", async () => {
    jest
      .spyOn(InvalidAccessToken, "findOne")
      .mockResolvedValue({ token: "invalidToken" });
    const { req, res, next } = middlewareMock(
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
});
