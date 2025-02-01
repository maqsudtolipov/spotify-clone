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
    const loggedInUsers = await createUsersAndLogin(1);
  });

  // it("should add user id to the res object", async () => {
  //   const token = accessToken.match(/accessToken=([^;]+)/)[1];
  //
  //   const req = httpMocks.createRequest({
  //     cookies: {
  //       accessToken: token,
  //     },
  //   });
  //   const res = httpMocks.createResponse();
  //   const next = jest.fn();
  //   await ensureAuthenticated(req, res, next);
  //
  //   expect(req.user.id).toBeTruthy();
  //   expect(next).toHaveBeenCalled();
  // });
  // it("should fail when access token is missing", async () => {
  //   const req = httpMocks.createRequest({
  //     cookies: {},
  //   });
  //   const res = httpMocks.createResponse();
  //   const next = jest.fn();
  //   await ensureAuthenticated(req, res, next);
  //
  //   expect(next.mock.calls[0][0].statusCode).toBe(401);
  //   expect(next.mock.calls[0][0].message).toMatch(/Access token not found/i);
  // });
  //
  // it("should fail when access token is invalid", async () => {
  //   const userId = new mongoose.Types.ObjectId();
  //
  //   const accessToken = jwt.sign(
  //     {
  //       userId,
  //       subject: "accessToken",
  //     },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     { expiresIn: "1h" },
  //   );
  //   const decodedAccessToken = jwt.verify(
  //     accessToken,
  //     process.env.ACCESS_TOKEN_SECRET,
  //   );
  //   await InvalidAccessToken.create({
  //     token: accessToken,
  //     userId: decodedAccessToken.userId,
  //     expiresAt: new Date(decodedAccessToken.exp),
  //   });
  //
  //   const req = httpMocks.createRequest({
  //     cookies: {
  //       accessToken,
  //     },
  //   });
  //   const res = httpMocks.createResponse();
  //   const next = jest.fn();
  //   await ensureAuthenticated(req, res, next);
  //
  //   expect(next.mock.calls[0][0].statusCode).toBe(401);
  //   expect(next.mock.calls[0][0].message).toMatch(/Access token invalid/i);
  //   expect(next.mock.calls[0][0].code).toBe("AccessTokenInvalid");
  // });
});
