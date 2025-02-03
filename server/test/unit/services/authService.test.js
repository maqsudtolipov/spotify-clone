const app = require("../../../src/app");
const User = require("../../../src/models/userModel");
const authService = require("../../../src/services/authService");
const AppError = require("../../../src/utils/AppError");
const loginService = require("../../../src/services/authService");
const bcrypt = require("bcryptjs");

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

  it("should create a user with the default img id", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);
    jest.spyOn(User, "getDefaultUserImgId").mockResolvedValue("defaultImgId");
    jest.spyOn(User, "create").mockResolvedValue({
      email: "user@example.com",
      img: "defaultImgId",
    });

    const newUser = await authService.signUp({
      email: "user@example.com",
      password: "password",
    });

    expect(User.getDefaultUserImgId).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password",
      img: "defaultImgId",
    });
    expect(newUser).toMatchObject({
      email: "user@example.com",
      img: "defaultImgId",
    });
  });
});

describe("login service", () => {
  it("should throw error if user does not exist", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      populate: jest.fn().mockResolvedValue(),
    });

    const error = await loginService.login("user@example.com").catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Invalid email or password");
  });

  it("should throw error if passwords does not match", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      populate: jest.fn().mockResolvedValue({email: "user@example.com"}),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    const error = await loginService.login("user@example.com").catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Invalid email or password");
  });
});
