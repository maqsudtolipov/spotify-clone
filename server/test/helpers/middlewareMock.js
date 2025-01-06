const httpMocks = require("node-mocks-http");

/**
 * It generates a mock request, response and next function in one place
 * @param reqOptions
 * @param resOptions
 */
const middlewareMock = (reqOptions, resOptions) => {
  const req = httpMocks.createRequest(reqOptions);
  const res = httpMocks.createResponse(resOptions);
  const next = jest.fn();

  return { req, res, next };
};

module.exports = middlewareMock;
