const authorize = require("../../../src/middlewares/authorize");
const middlewareMock = require("../../helpers/middlewareMock");
const User = require("../../../src/models/userModel");

jest.mock("../../../src/models/userModel");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Authorize middleware", () => {
  it("should call the next function", async () => {
    User.findById.mockResolvedValue({id: "userId", role: "admin"});

    const {req, res, next} = middlewareMock({user: {id: "userId"}});
    const authorizeRes = authorize(["admin"]);
    await authorizeRes(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 403 if user is not authorized", async () => {
    User.findById.mockResolvedValue({id: "userId", role: "user"});

    const {req, res, next} = middlewareMock(
      {user: {id: "userId"}},
      {},
      true,
    );
    const authorizeMiddleware = authorize(["admin"]);
    await authorizeMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({message: "Access denied"});
    expect(next).not.toHaveBeenCalled();
  });
});
