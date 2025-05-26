const httpMocks = require("node-mocks-http");

/**
 * It generates a mock request, response and next function in one place
 * @param reqOptions
 * @param resOptions
 */
const middlewareMock = (reqOptions, resOptions, mockMethods = false) => {
  const req = httpMocks.createRequest(reqOptions);
  const res = httpMocks.createResponse(resOptions);
  const next = jest.fn();

  // If true, mock status and json function
  if (mockMethods) {
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
  }

  return {req, res, next};
};

module.exports = middlewareMock;
