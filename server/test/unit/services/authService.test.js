const app = require("../../../src/app");
const User = require("../../../src/models/userModel");
const authService = require("../../../src/services/authService");
const AppError = require("../../../src/utils/AppError");
const loginService = require("../../../src/services/authService");
const bcrypt = require("bcryptjs");
const {
  attachAccessCookie,
  attachRefreshCookie,
} = require("../../../src/utils/attachCookieTokens");
const RefreshToken = require("../../../src/models/refreshTokenModel");
const jwt = require("jsonwebtoken");

jest.mock("../../../src/models/userModel");
jest.mock("../../../src/utils/attachCookieTokens");
jest.mock("jsonwebtoken");

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
      populate: jest.fn().mockResolvedValue({
        email: "user@example.com",
        password: "correctPass",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    const error = await loginService
      .login("user@example.com", "wrongPass")
      .catch((e) => e);

    expect(bcrypt.compare).toHaveBeenCalledWith("wrongPass", "correctPass");
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Invalid email or password");
  });

  it("should attach cookies to response and return user", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        email: "user@example.com",
        password: "correctPass",
        library: {items: []},
        toObject: function () {
          return this;
        },
      }),
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    attachAccessCookie.mockImplementation(() => ({}));
    attachRefreshCookie.mockImplementation(() => ({}));

    jest.spyOn(RefreshToken, "create").mockResolvedValue();

    const res = {};
    const response = await authService
      .login("user@example.com", "correctPass", res)
      .catch((e) => e);

    expect(attachAccessCookie).toHaveBeenCalled();
    expect(attachRefreshCookie).toHaveBeenCalled();
    expect(RefreshToken.create).toHaveBeenCalled();
    expect(response).toMatchObject({
      email: "user@example.com",
      password: "correctPass",
      library: {items: []},
    });
  });
});

describe("refreshToken service", () => {
  it("should throw error if jwt verify fails", async () => {
    jest.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error();
    });

    const error = await authService.refreshToken().catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Refresh token is invalid or expired");
  });

  it("should throw error if refresh token is not inside db", async () => {
    jest.spyOn(jwt, "verify").mockResolvedValue({
      token: "refreshToken",
      userId: "userId",
    });
    jest.spyOn(RefreshToken, "findOne").mockResolvedValue(null);

    const error = await authService.refreshToken().catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Refresh token is invalid or expired");
  });
  // delete refresh old token, attach new tokens and create new refresh token
});
