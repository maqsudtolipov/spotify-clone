const app = require("../../../src/app");
const User = require("../../../src/models/userModel");
const authService = require("../../../src/services/authService");
const AppError = require("../../../src/utils/AppError");

jest.mock("../../../src/models/userModel");

let server;
beforeAll(async () => {
  server = app.listen(3009);
});

afterAll(async () => {
  server.close();
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("signUp service", () => {
  it("should throw AppError if email already exists", async () => {
    jest
      .spyOn(User, "findOne")
      .mockResolvedValue({email: "user@example.com"});
    const error = await authService
      .signUp({email: "user@example.com"})
      .catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(409);
    expect(error.message).toBe("Email already exists");
  });
});
