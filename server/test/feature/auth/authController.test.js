const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../../src/app");
const User = require("../../../src/feature/auth/userModel");

let server;

jest.timeout(30000);

beforeAll(async () => {
  try {
    // Ensure DB_URL and DB_PASS are set in the environment variables
    if (!process.env.DB_URL || !process.env.DB_PASS) {
      throw new Error("Missing required environment variables: DB_URL or DB_PASS");
    }

    process.env.NODE_ENV = "production";

    // Construct the database URL
    const DB = process.env.DB_URL.replace("<db_password>", process.env.DB_PASS).replace("<db_name>", "test");

    console.log("Connecting to database:", DB); // Log the database connection URL

    // Connect to the database
    await mongoose.connect(DB);

    console.log("Connected to database"); // Log a success message

    server = app.listen(3009);
  } catch (error) {
    console.error("Error in beforeAll setup:", error);
    process.exit(1); // Exit if there's an error in setup
  }
});

afterEach(async () => {
  try {
    console.log("Deleting all users"); // Log a message before deleting users
    await User.deleteMany();
  } catch (error) {
    console.error("Error in afterEach cleanup:", error);
  }
});

afterAll(async () => {
  try {
    console.log("Disconnecting from database"); // Log a message before disconnecting
    await mongoose.disconnect();
    server.close();
  } catch (error) {
    console.error("Error in afterAll cleanup:", error);
  }
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
