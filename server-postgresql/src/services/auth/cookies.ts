import { Response } from "express";
import jwt from "jsonwebtoken";

export const attachToken = (
  res: Response,
  userId: string,
  tokenType: "access" | "refresh",
) => {
  // generate access token
  const secret =
    tokenType === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;
  const expiresIn =
    tokenType === "access"
      ? Number(process.env.ACCESS_TOKEN_EXP)
      : Number(process.env.REFRESH_TOKEN_EXP);
  const env = process.env.NODE_ENV;
  const clientDomain = process.env.CLIENT_DOMAIN;

  if (!secret || !expiresIn || !env || !clientDomain) {
    throw new Error("Secret tokens are not set in cookies.ts");
  }

  const token = jwt.sign({ userId }, secret, { expiresIn });

  // attach cookie
  const sameSite: "lax" | "strict" | "none" =
    env === "production" ? "lax" : "strict";

  const expiresAt = new Date(Date.now() + expiresIn);
  const cookieOptions = {
    expires: expiresAt,
    httpOnly: true,
    secure: env === "production",
    path: tokenType === "access" ? "/" : "/api/auth/refresh-token",
    sameSite,
    domain: env === "production" ? clientDomain : "localhost",
  };

  res.cookie(`${tokenType}Token`, token, cookieOptions);

  return { token, expiresAt };
};
