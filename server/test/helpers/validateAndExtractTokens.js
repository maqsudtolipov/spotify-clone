class TokenHandler {
  constructor(res) {
    if (!res) {
      throw new Error("Response object is not provided.");
    }

    this.cookies = res.get("set-cookie");

    if (!this.cookies || this.cookies.length === 0) {
      throw new Error("No cookies found in the response object.");
    }

    this.accessToken = this.extractToken("accessToken");
    this.refreshToken = this.extractToken("refreshToken");
  }

  // Extract token value by name
  extractToken(name) {
    const cookie = this.cookies.find((c) => c.startsWith(`${name}=`));
    return cookie.match(new RegExp(`${name}=([^;]+)`))?.[1] ?? null;
  }

  validate() {
    expect(this.cookies.length).toBe(2);

    this.cookies.forEach((cookie) => {
      expect(cookie).toBeTruthy();
      expect(cookie).toMatch(/HttpOnly/i);
    });

    expect(this.cookies.find((c) => c.startsWith("refreshToken="))).toMatch(
      /Path=\/api\/auth\/refresh-token/i,
    );

    return this;
  }
}

function validateAndExtractTokens(res) {
  return new TokenHandler(res);
}

module.exports = validateAndExtractTokens;
