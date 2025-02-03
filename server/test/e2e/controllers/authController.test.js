const {
  connectToDatabase,
  cleanupDatabaseAndDisconnect,
} = require("../../helpers/databaseHelpers");
const app = require("../../../src/app");
const createUsersAndLogin = require("../../helpers/createUsersAndLogin");
const request = require("supertest");

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
    let testUser;
    const signUp = async (userData) =>
      request(app).post("/api/auth/signup").send(userData);

    beforeAll(async () => {
      const users = await createUsersAndLogin(1);
      testUser = users[0];
    });

    it("should return 422 if required fields are missing", async () => {
      const res = await signUp({});

      expect(res.body).toMatchObject({
        status: "fail",
        message: "Please provide name, email, password and passwordConfirm",
      });
    });
  });
});
