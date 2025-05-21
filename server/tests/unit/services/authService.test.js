const authService = require("../../../src/services/authService");
const AppError = require("../../../src/utils/AppError");
const User = require("../../../src/models/userModel");
const loginService = require("../../../src/services/authService");
const bcrypt = require("bcryptjs");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("createNewUser", () => {
  it("should throw 422 error if any of inputs are missing", async () => {
    const resError = await authService
      .signupUser({ email: "user@example.com" })
      .catch((e) => e);

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 422,
      message: "Please provide name, email, password and passwordConfirm",
    });
  });

  it("should throw 409 error if user already exists", async () => {
    jest
      .spyOn(User, "findOne")
      .mockResolvedValue({ email: "user@example.com" });
    const resError = await authService
      .signupUser({
        name: "User",
        email: "user@example.com",
        password: "pass1234",
        passwordConfirm: "pass1234",
      })
      .catch((e) => e);

    expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 409,
      message: "User already exists",
    });
  });

  it("should create new user and return their data", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);
    jest.spyOn(User, "getDefaultUserImgId").mockResolvedValue("defaultImgId");
    jest.spyOn(User, "create").mockResolvedValue({
      email: "user@example.com",
    });

    const newUser = await authService.signupUser({
      name: "User",
      email: "user@example.com",
      password: "pass1234",
      passwordConfirm: "pass1234",
    });

    expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });
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
    });
  });
});

describe("verifyAndReturnUserData", () => {
  it("should throw 422 error for missing inputs", async () => {
    const resError = await authService
      .loginUser({ email: "user@example.com" })
      .catch((e) => e);

    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 422,
      message: "Please provide email and password",
    });
  });

  it("should throw 401 is user does not exist", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: () => null,
    });

    const resError = await loginService
      .loginUser({ email: "user@example.com", password: "pass1234" })
      .catch((e) => e);

    expect(User.findOne).toHaveBeenCalledWith({ email: "user@example.com" });
    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 401,
      message: "Invalid email or password",
    });
  });

  it("should throw 401 if passwords do not match", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue({
        email: "user@example.com",
        password: "correctPass",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    const resError = await loginService
      .loginUser({ email: "user@example.com", password: "wrongPass" })
      .catch((e) => e);

    expect(User.findOne).toHaveBeenCalledWith({
      email: "user@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith("wrongPass", "correctPass");
    expect(resError).toBeInstanceOf(AppError);
    expect(resError).toMatchObject({
      status: "fail",
      statusCode: 401,
      message: "Invalid email or password",
    });
  });

  it("should return user data", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue({
        id: "userId",
        name: "User",
        img: "user.png",
        password: "password",
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const res = await loginService.loginUser({
      email: "user@example.com",
      password: "password",
    }, 'res');

    expect(User.findOne).toHaveBeenCalledWith({
      email: "user@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith("password", "password");

    expect(res).toMatchObject({
      id: "userId",
      name: "User",
      img: "user.png",
    });
  });
});

describe("verifyAndCleanTokens", () => {
  it("should throw 401 if token is not provided", () => {
    
  });
  
  it("should throw 401 if token is invalid", () => {})

  it("should throw 401 if refresh token is not stored in db", () => {
    
  });

  it("should generate new tokens and attach it into res object", () => {
    
  });
})