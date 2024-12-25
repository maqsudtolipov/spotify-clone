const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/userModel");
const RefreshToken = require("../../src/models/refreshTokenModel");
const jwt = require("jsonwebtoken");
const {
  refreshToken: refreshTokenController,
} = require("../../src/controllers/authController");
const httpMocks = require("node-mocks-http");
const ensureAuthenticated = require("../../src/middlewares/ensureAuthenticated");
const generateRefreshToken = require("../../src/utils/generateRefreshToken");

let server;
beforeAll(async () => {
  process.env.NODE_ENV = "production";

  if (
    !process.env.DB_TEST_URL &&
    !/test-database/.test(process.env.DB_TEST_URL)
  ) {
    console.log("Tests can only and must connect to a test database.");
  }

  const DB = process.env.DB_TEST_URL.replace(
    "<db_password>",
    process.env.DB_PASS,
  );
  await mongoose.connect(DB);

  server = app.listen(3009);
});

afterAll(async () => {
  await User.deleteMany();
  await RefreshToken.deleteMany();
  await mongoose.disconnect();
  server.close();
});

describe("AuthController", () => {
  describe("/signup route", () => {
    const signUp = async (userData) =>
      request(app).post("/api/auth/signup").send(userData);

    it("should create a new user", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "Pa$$1234",
        passwordConfirm: "Pa$$1234",
      };

      const res = await signUp(userData);

      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toHaveProperty("name", "John Doe");
    });

    it("should fail when required fields are missing", async () => {
      const userData = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      };

      const res = await signUp(userData);

      expect(res.status).toBe(422);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(
        /Please provide name, email, password and passwordConfirm/i,
      );
    });

    it("should fail when the email already exists", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "Pa$$1234",
        passwordConfirm: "Pa$$1234",
      };

      const res = await signUp(userData);

      expect(res.status).toBe(409);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Email already exists/i);
    });

    it("should fail when email is invalid", async () => {
      const userData = {
        name: "John Doe",
        email: "notanemail",
        password: "Pa$$1234",
        passwordConfirm: "Pa$$1234",
      };

      const res = await signUp(userData);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Please provide a valid email address/i);
    });

    it("should fail when password does not match", async () => {
      const userData = {
        name: "Darren Jordan",
        email: "sanforddarryl@example.com",
        password: "Pa$$1234",
        passwordConfirm: "Pa$$12345",
      };

      const res = await signUp(userData);

      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Passwords do not match/i);
    });
  });

  describe("/login route", () => {
    const login = async (userData) =>
      request(app).post("/api/auth/login").send(userData);

    it("should login a user", async () => {
      const userData = {
        email: "john@example.com",
        password: "Pa$$1234",
      };

      const res = await login(userData);
      const cookies = res.get("set-cookie");
      const accessToken = cookies.find((cookie) =>
        cookie.startsWith("accessToken="),
      );
      const refreshToken = cookies.find((cookie) =>
        cookie.startsWith("refreshToken="),
      );

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.user).toHaveProperty("name", "John Doe");

      expect(cookies.length).toBe(2);
      expect(accessToken).toBeTruthy();
      expect(accessToken).toMatch(/HttpOnly/i);
      expect(refreshToken).toBeTruthy();
      expect(refreshToken).toMatch(/HttpOnly/i);
      expect(refreshToken).toMatch(/Path=\/api\/auth\/refresh-token/i);
    });

    it("should fail when email or password is missing", async () => {
      const userData = {
        email: "",
        password: "",
      };

      const res = await login(userData);

      expect(res.status).toBe(422);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Please provide email and password/i);
    });

    it("should fail when user does not exist", async () => {
      const userData = {
        email: "nonexistent@example.com",
        password: "Pa$$1234",
      };

      const res = await login(userData);

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid email or password/i);
    });

    it("should fail when password is incorrect", async () => {
      const userData = {
        email: "john@example.com",
        password: "wrongpassword",
      };

      const res = await login(userData);

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Invalid email or password/i);
    });
  });

  describe("/refresh-token route", () => {
    let accessToken, refreshToken;

    // Login user and save the refresh token
    beforeAll(async () => {
      const userData = {
        email: "john@example.com",
        password: "Pa$$1234",
      };

      const res = await request(app).post("/api/auth/login").send(userData);
      const cookies = res.get("set-cookie");
      accessToken = cookies.find((cookie) => cookie.startsWith("accessToken="));
      refreshToken = cookies.find((cookie) =>
        cookie.startsWith("refreshToken="),
      );
    });

    it("it should send new access and refresh tokens", async () => {
      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [refreshToken])
        .send();

      const cookies = res.get("set-cookie");
      accessToken = cookies.find((cookie) => cookie.startsWith("accessToken="));
      refreshToken = cookies.find((cookie) =>
        cookie.startsWith("refreshToken="),
      );

      expect(cookies.length).toBe(2);
      expect(accessToken).toBeTruthy();
      expect(accessToken).toMatch(/HttpOnly/i);
      expect(refreshToken).toBeTruthy();
      expect(refreshToken).toMatch(/HttpOnly/i);
      expect(refreshToken).toMatch(/Path=\/api\/auth\/refresh-token/i);
    });

    it("it should fail when refresh token is not provided", async () => {
      const res = await request(app).post("/api/auth/refresh-token").send();

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/No refresh token provided/i);
    });

    it("should fail when refresh token does not exist in database", async () => {
      // Generate req, res and next
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/auth/refresh-token",
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      // Attach the refresh token to the request
      const userId = new mongoose.Types.ObjectId();
      const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
          subject: "refreshToken",
        },
      );
      req.cookies = { refreshToken };

      // Call the /refresh-token route
      await refreshTokenController(req, res, next);

      console.log(next.mock.calls);
      expect(next.mock.calls[0][0].statusCode).toBe(401);
      expect(next.mock.calls[0][0].message).toMatch(
        /Refresh token is invalid or expired/i,
      );
    });

    it("it should fail when refresh token is modified", async () => {
      const fakeRefreshToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxOTM5MzE1MDhhOGU1ZDVlM2NmY2IiLCJpYXQiOjE2MzQ0NDcyNTMsImV4cCI6MTYzNDQ0NzI2Mywic3ViIjoiYWNjZXNzVG9rZW4ifQ.WTMJCaoQ0h-nOXxh0bhvfhfQv0y_vgoyV98vjealhfs";
      const modifiedRefreshToken = refreshToken.replace(
        /(?<=refreshToken=)[^;]+/,
        fakeRefreshToken,
      );

      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [modifiedRefreshToken])
        .send();

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toMatch(/Refresh token is invalid or expired/i);
    });
  });
});
