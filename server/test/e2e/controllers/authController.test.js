const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../../helpers/databaseHelpers");
const app = require("../../../src/app");
const createUsersAndLogin = require("../../helpers/createUsersAndLogin");
const request = require("supertest");
const {testUsers} = require("../../testData");
const User = require("../../../src/models/userModel");
const File = require("../../../src/models/fileModel");
const Library = require("../../../src/models/libraryModel");

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
      expect(res.body.message).toMatch(/Email already exists/i);
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
});
