/**
 * It validates the request and extracts the tokens from the request. Works with supertest.
 * @param res
 */
const validateAndExtractTokens = (res) => {
  const cookies = res.get("set-cookie");

  const accessToken = cookies.find((cookie) =>
    cookie.startsWith("accessToken="),
  );

  const refreshToken = cookies.find((cookie) =>
    cookie.startsWith("refreshToken="),
  );

  expect(cookies.length).toBe(2);
  expect(accessToken).toBeTruthy();
  expect(accessToken).toMatch(/HttpOnly/i);
  expect(refreshToken).toBeTruthy();
  expect(refreshToken).toMatch(/HttpOnly/i);
  expect(refreshToken).toMatch(/Path=\/api\/auth\/refresh-token/i);

  return { accessToken, refreshToken };
};

module.exports = validateAndExtractTokens;
