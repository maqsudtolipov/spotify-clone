const app = require("../../../src/config/app.config");
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
const InvalidAccessToken = require("../../../src/models/invalidAccessTokenModel");

jest.mock("../../../src/models/userModel");
jest.mock("../../../src/models/RefreshTokenModel");
jest.mock("../../../src/utils/attachCookieTokens");
jest.mock("jsonwebtoken");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("signUp service", () => {
  it("should throw 422 error if required fields are missing", async () => {
    const resError = await authService
      .signUp({ email: "user@example.com" })
      .catch((e) => e);

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 422,
      message: "Please provide name, email, password and passwordConfirm",
    });
  });
  it("should throw 409 if the user already exists", async () => {
    jest
      .spyOn(User, "findOne")
      .mockResolvedValue({ email: "user@example.com" });
    const resError = await authService
      .signUp({
        name: "User",
        email: "user@example.com",
        password: "pass1234",
        passwordConfirm: "pass1234",
      })
      .catch((e) => e);

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 409,
      message: "User already exists",
    });
  });
  it("should create a user with the default img id", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);
    jest.spyOn(User, "getDefaultUserImgId").mockResolvedValue("defaultImgId");
    jest.spyOn(User, "create").mockResolvedValue({
      img: "defaultImgId",
      email: "user@example.com",
    });

    const newUser = await authService.signUp({
      name: "User",
      email: "user@example.com",
      password: "pass1234",
      passwordConfirm: "pass1234",
    });

    expect(User.getDefaultUserImgId).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalledWith({
      name: "User",
      email: "user@example.com",
      password: "pass1234",
      passwordConfirm: "pass1234",
      img: "defaultImgId",
      role: "user",
    });
    expect(newUser).toMatchObject({
      email: "user@example.com",
      img: "defaultImgId",
    });
  });
});

describe("login service", () => {
  it("should throw 422 error if required fields are missing", async () => {
    const resError = await authService
      .login({ email: "user@example.com" })
      .catch((e) => e);

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 422,
      message: "Please provide email and password",
    });
  });

  it("should throw 401 if user does not exist", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: () => null,
    });

    const resError = await loginService
      .login({ email: "user@example.com", password: "pass1234" })
      .catch((e) => e);
    console.log(resError);

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 401,
      message: "Invalid email or password",
    });
  });

  it("should throw 401 if passwords does not match", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue({
        email: "user@example.com",
        password: "correctPass",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    const resError = await loginService
      .login({ email: "user@example.com", password: "wrongPass" })
      .catch((e) => e);

    expect(bcrypt.compare).toHaveBeenCalledWith("wrongPass", "correctPass");
    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 401,
      message: "Invalid email or password",
    });
  });

  it("should generate cookies and save to database", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue({
        id: "userId",
        name: "User",
        img: "user.png",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    attachAccessCookie.mockReturnValue("accessToken");
    attachRefreshCookie.mockReturnValue("refreshToken");
    jest.spyOn(RefreshToken, "create").mockResolvedValue(null);

    await loginService.login({
      email: "user@example.com",
      password: "pass1234",
    });

    expect(RefreshToken.create).toHaveBeenCalledWith({
      userId: "userId",
      token: "refreshToken",
    });
  });

  it("should return user data", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue({
        id: "userId",
        name: "User",
        img: "user.png",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    attachAccessCookie.mockReturnValue("accessToken");
    attachRefreshCookie.mockReturnValue("refreshToken");
    jest.spyOn(RefreshToken, "create").mockResolvedValue(null);

    const res = await loginService.login({
      email: "user@example.com",
      password: "pass1234",
    });

    expect(res).toMatchObject({
      id: "userId",
      name: "User",
      img: "user.png",
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

    expect(RefreshToken.findOne).toHaveBeenCalled();
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe("Refresh token is invalid or expired");
  });
  // delete refresh old token, attach new tokens and create new refresh token

  it("should delete old refresh token, attach new tokens to res and save refresh token to db", async () => {
    jest.spyOn(jwt, "verify").mockResolvedValue();
    jest
      .spyOn(RefreshToken, "findOne")
      .mockResolvedValue({ token: "refreshToken" });
    jest.spyOn(RefreshToken, "deleteMany").mockResolvedValue();
    jest.spyOn(RefreshToken, "create").mockResolvedValue({});

    attachAccessCookie.mockImplementation(() => ({}));
    attachRefreshCookie.mockImplementation(() => ({}));

    await authService.refreshToken();

    expect(RefreshToken.deleteMany).toHaveBeenCalled();
    expect(attachAccessCookie).toHaveBeenCalled();
    expect(attachRefreshCookie).toHaveBeenCalled();
    expect(RefreshToken.create).toHaveBeenCalled();
  });
});

describe("logout service", () => {
  it("should delete all refresh tokens and blocklist current access token", async () => {
    jest.spyOn(RefreshToken, "deleteMany").mockResolvedValue();
    jest.spyOn(InvalidAccessToken, "create").mockResolvedValue();

    await authService.logout("userId", "accessToken");

    expect(RefreshToken.deleteMany).toHaveBeenCalled();
    expect(InvalidAccessToken.create).toHaveBeenCalled();
  });
});
