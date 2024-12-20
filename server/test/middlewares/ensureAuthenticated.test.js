const mongoose = require("mongoose");
const request = require("supertest");
const httpMocks = require("node-mocks-http");
const ensureAuthenticated = require("../../src/middlewares/ensureAuthenticated");
const app = require("../../src/app");
const User = require("../../src/models/userModel");
const InvalidAccessToken = require("../../src/models/invalidAccessTokenModel");

let server;
let accessToken;

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

  // Signup and login user
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    password: "Pa$$1234",
    passwordConfirm: "Pa$$1234",
  };

  await request(app).post("/api/auth/signup").send(userData);
  const loginRes = await request(app).post("/api/auth/login").send(userData);

  accessToken = loginRes
    .get("set-cookie")
    .find((cookie) => cookie.startsWith("accessToken="));
});

afterAll(async () => {
  await User.deleteMany();
  await InvalidAccessToken.deleteMany();
  await mongoose.disconnect();
  server.close();
});

describe("Ensure Authenticated Middleware", () => {
  it("should add user id to the res object", async () => {
    const token = accessToken.match(/accessToken=([^;]+)/)[1];

    const req = httpMocks.createRequest({
      cookies: {
        accessToken: token,
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await ensureAuthenticated(req, res, next);

    expect(req.user.id).toBeTruthy();
    expect(next).toHaveBeenCalled();
  });
});
