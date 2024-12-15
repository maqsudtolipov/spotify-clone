const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../../src/app");
const User = require("../../../src/feature/auth/userModel");

let server;

beforeAll(async () => {
  process.env.NODE_ENV = "production";
  console.log(process.env.DB_PASS)

  const DB = process.env.DB_URL.replace(
    "<db_password>",
    process.env.DB_PASS,
  ).replace("<db_name>", "test");

  console.log("Connecting to database:", DB);  // Log the database connection URL

  await mongoose.connect(DB);

  console.log("Connected to database");  // Log a success message

  server = app.listen(3009);
});

afterEach(async () => {
  console.log(process.env.DB_PASS)
  console.log("Deleting all users");  // Log a message before deleting users
  await User.deleteMany();
});

afterAll(async () => {
  console.log(process.env.DB_PASS)
  console.log("Disconnecting from database");  // Log a message before disconnecting
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
