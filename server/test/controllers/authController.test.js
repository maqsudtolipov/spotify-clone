const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/userModel");

beforeAll(async () => {
  process.env.NODE_ENV = "production";

  const DB = process.env.DB_URL.replace(
    "<db_password>",
    process.env.DB_PASS,
  ).replace("<db_name>", "test");
  await mongoose.connect(DB);

  server = app.listen(3009);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe("AuthController - signUp", () => {
  it("should create a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "Pa$$1234",
      passwordConfirm: "Pa$$1234",
    };

    const res = await request(app).post("/api/auth/sign-up").send(userData);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("name", "John Doe");
  });

  it("should fail when email is invalid", async () => {
    const userData = {
      name: "John Doe",
      email: "notanemail",
      password: "Pa$$1234",
      passwordConfirm: "Pa$$1234",
    };

    const res = await request(app).post("/api/auth/sign-up").send(userData);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toMatch(/Please provide a valid email address/i);
  });

  it("should fail when password does not match", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "Pa$$1234",
      passwordConfirm: "Pa$$12345",
    };

    const res = await request(app).post("/api/auth/sign-up").send(userData);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toMatch(/Passwords do not match/i);
  });

  it("should fail when required fields are missing", async () => {
    const userData = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };

    const res = await request(app).post("/api/auth/sign-up").send(userData);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toMatch(/Please provide a name/i);
  });
});
