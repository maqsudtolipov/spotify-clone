const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../../src/app");
const User = require("../../../src/models/userModel");
const RefreshToken = require("../../../src/models/refreshTokenModel");
const {
  refreshToken: refreshTokenController,
} = require("../../../src/controllers/authController");
const middlewareMock = require("../../helpers/middlewareMock");
const validateAndExtractTokens = require("../../helpers/validateAndExtractTokens");
const {generateRefreshToken} = require("../../../src/utils/genereateTokens");
const InvalidAccessToken = require("../../../src/models/invalidAccessTokenModel");
const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../../helpers/databaseHelpers");
const Playlist = require("../../../src/models/playlistModel");

const testUser = {
  name: "John Doe",
  email: "john@example.com",
  password: "Pa$$1234",
  passwordConfirm: "Pa$$1234",
};

let server;
beforeAll(async () => {
  process.env.NODE_ENV = "production";
  await connectToDatabase();
  server = app.listen(3009);
});

afterAll(async () => {
  await cleanupDatabaseAndDisconnect();
  server.close();
});

describe("authController", () => {
  describe("/refresh-token route", () => {
    let accessToken, refreshToken;

    beforeAll(async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "Pa$$1234",
      });

      const token = validateAndExtractTokens(res);
      accessToken = token.accessToken;
      refreshToken = token.refreshToken;
    });

    it("should send new access and refresh tokens", async () => {
      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [`refreshToken=${refreshToken}`])
        .send();

      validateAndExtractTokens(res).validate();
    });

    it("should fail when refresh token is not provided", async () => {
      const res = await request(app).post("/api/auth/refresh-token").send();

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/No refresh token provided/i);
    });

    it("should fail when refresh token does not exist in database", async () => {
      const userId = new mongoose.Types.ObjectId();
      const refreshToken = generateRefreshToken(userId);

      const {req, res, next} = middlewareMock({
        method: "POST",
        url: "/api/auth/refresh-token",
        cookies: {
          refreshToken,
        },
      });

      await refreshTokenController(req, res, next);

      expect(next.mock.calls[0][0].statusCode).toBe(401);
      expect(next.mock.calls[0][0].message).toMatch(
        /Refresh token is invalid or expired/i,
      );
    });

    it("should fail when refresh token is modified", async () => {
      const userId = new mongoose.Types.ObjectId();
      const refreshToken = generateRefreshToken(userId);
      const modifiedRefreshToken =
        refreshToken.substring(0, refreshToken.length - 2) + "Kq";

      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [`refreshToken=${modifiedRefreshToken}`])
        .send();

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Refresh token is invalid or expired/i);
    });

    it("should fail when refresh token is expired", async () => {
      const userId = new mongoose.Types.ObjectId();
      const refreshToken = generateRefreshToken(userId, -900000);

      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [`refreshToken=${refreshToken}`])
        .send();

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Refresh token is invalid or expired/i);
    });
  });

  describe("/logout route", () => {
    let accessToken, refreshToken, userId;

    beforeAll(async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "Pa$$1234",
      });

      userId = res.body.user.id;

      const token = validateAndExtractTokens(res);
      accessToken = token.accessToken;
      refreshToken = token.refreshToken;
    });

    it("should delete all refresh tokens from database and blacklist access token", async () => {
      const res = await request(app)
        .get("/api/auth/logout")
        .set("Cookie", [`accessToken=${accessToken}`]);
      expect(res.status).toBe(204);

      const refreshTokens = await RefreshToken.find({userId});
      expect(refreshTokens.length).toBe(0);

      const invalidAccessToken = await InvalidAccessToken.findOne({
        token: accessToken,
      });
      expect(invalidAccessToken).toBeTruthy();
    });
  });
});
