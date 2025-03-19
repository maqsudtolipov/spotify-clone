const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../../helpers/databaseHelpers");
const app = require("../../../src/config/app.config");
const createUsersAndLogin = require("../../helpers/createUsersAndLogin");
const request = require("supertest");
const {testUsers} = require("../../testData");
const User = require("../../../src/models/userModel");
const validateAndExtractTokens = require("../../helpers/validateAndExtractTokens");
const RefreshToken = require("../../../src/models/refreshTokenModel");
const InvalidAccessToken = require("../../../src/models/invalidAccessTokenModel");
const {generateRefreshToken} = require("../../../src/utils/genereateTokens");

let server;
beforeAll(async () => {
  await connectToDatabase();
  server = app.listen(3009);
});

afterAll(async () => {
  await cleanupDatabaseAndDisconnect();
  server.close();
});

describe("authController", () => {
  describe("POST /signup", () => {
    let testUser = testUsers[0];
    const signUp = async (userData) =>
      request(app).post("/api/auth/signup").send(userData);

    it("should create user with necessary data and return it", async () => {
      const res = await signUp(testUser);

      const user = await User.findById(res.body.data.id);

      expect(res.body).toMatchObject({
        status: "success",
        data: {name: "Alex", email: "Alex"},
      });
      expect(user).toBeTruthy();
    });

    it("should return 422 if required fields are missing", async () => {
      const res = await signUp({});

      expect(res.body).toMatchObject({
        status: "fail",
        message: "Please provide name, email, password and passwordConfirm",
      });
    });

    it("should return 409 if the user already exists", async () => {
      const res = await signUp(testUser);

      expect(res.status).toBe(409);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/User already exists/i);
    });

    it("should return 400 when email is invalid", async () => {
      const res = await signUp({...testUser, email: "invalidemail"});

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Please provide a valid email address/i);
    });

    it("should return 400 if password does not match", async () => {
      const res = await signUp({
        ...testUser,
        email: "differentuser@example.com",
        passwordConfirm: "1234Pa$$",
      });

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Passwords do not match/i);
    });
  });

  describe("POST /login", () => {
    const login = async (userData) =>
      request(app).post("/api/auth/login").send(userData);
    let users, accessToken, refreshToken;

    beforeAll(async () => {
      users = await createUsersAndLogin(1);
    });

    it("should login user and return auth tokens", async () => {
      const res = await login({
        email: users[0].email,
        password: users[0].password,
      });

      const tokens = validateAndExtractTokens(res).validate();
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(accessToken).toBeTruthy();
      expect(refreshToken).toBeTruthy();
    });

    it("should save the new refresh token in the database", async () => {
      const newRefreshToken = await RefreshToken.findOne({
        token: refreshToken,
      });

      expect(newRefreshToken).toBeTruthy();
    });

    it("should fail when email or password is missing", async () => {
      const res = await login({
        email: "",
        password: "",
      });

      expect(res.status).toBe(422);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Please provide email and password/i);
    });

    it("should fail when user does not exist", async () => {
      const res = await login({
        email: "nonexistent@example.com",
        password: "Pa$$1234",
      });

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid email or password/i);
    });

    it("should fail when password is incorrect", async () => {
      const res = await login({
        email: "john@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid email or password/i);
    });
  });

  describe("POST /refresh-token", () => {
    let user, accessToken, refreshToken;

    beforeAll(async () => {
      const users = await createUsersAndLogin(1);
      user = users[0];
      accessToken = users[0].accessToken;
      refreshToken = users[0].refreshToken;
    });

    it("should attach new access and refresh tokens to request", async () => {
      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [`refreshToken=${refreshToken}`]);

      validateAndExtractTokens(res).validate();
    });

    it("should return 401 if refresh token not provided", async () => {
      const res = await request(app).post("/api/auth/refresh-token");

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe("No refresh token provided");
    });

    it("should return 401 if refresh token does not exist in database", async () => {
      const refreshToken = generateRefreshToken("67a18d64f606691f74de757c"); // Random user id

      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [`refreshToken=${refreshToken}`]);

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe("Refresh token is invalid or expired");
    });

    it("should return 401 if refresh token is modified", async () => {
      const refreshToken = generateRefreshToken("67a18dbf594c4cb869f05650"); // Random user id
      const modifiedRefreshToken =
        refreshToken.substring(0, refreshToken.length - 2) + "Kq";

      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [`refreshToken=${modifiedRefreshToken}`]);

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe("Refresh token is invalid or expired");
    });

    it("should send 401 if refresh token is expired", async () => {
      const refreshToken = generateRefreshToken(
        "67a18df9caa39510ae8d3578",
        -1000000,
      ); // Random user id

      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [`refreshToken=${refreshToken}`]);

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe("Refresh token is invalid or expired");
    });
  });

  describe("GET /logout", () => {
    let user, accessToken, refreshToken;

    beforeAll(async () => {
      const users = await createUsersAndLogin(1);
      user = users[0];
      accessToken = users[0].accessToken;
      refreshToken = users[0].refreshToken;
    });

    it("should delete all refresh tokens and blacklist current access token", async () => {
      const res = await request(app)
        .get("/api/auth/logout")
        .set("Cookie", [`accessToken=${accessToken}`]);

      const refreshTokens = await RefreshToken.find({user: user.id});
      const invalidAccessToken = await InvalidAccessToken.findOne({
        token: accessToken,
      });

      expect(refreshTokens.length).toBe(0);
      expect(res.status).toBe(204);
      expect(invalidAccessToken).toBeTruthy();
    });
  });
});
