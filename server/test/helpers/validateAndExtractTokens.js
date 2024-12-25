/**
 * It validates the request and extracts the tokens from the request. Works with supertest.
 * @param res
 */
function validateAndExtractTokens(res) {
  const cookies = res.get("set-cookie");

  // Find access and refresh token cookies
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("accessToken="),
  );
  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("refreshToken="),
  );

  // Check if both cookies are set
  expect(cookies.length).toBe(2);
  expect(accessTokenCookie).toBeTruthy();
  expect(accessTokenCookie).toMatch(/HttpOnly/i);
  expect(refreshTokenCookie).toBeTruthy();
  expect(refreshTokenCookie).toMatch(/HttpOnly/i);
  expect(refreshTokenCookie).toMatch(/Path=\/api\/auth\/refresh-token/i);

  // Extract token values using regex
  const accessToken =
    accessTokenCookie.match(/accessToken=([^;]+)/)?.[1] ?? null;
  const refreshToken =
    refreshTokenCookie.match(/refreshToken=([^;]+)/)?.[1] ?? null;

  return { accessToken, refreshToken };
}
module.exports = validateAndExtractTokens;
