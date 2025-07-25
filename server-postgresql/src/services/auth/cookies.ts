import { Response } from "express";
import jwt from "jsonwebtoken";

export const attachAccessToken = (res: Response, userId: string) => {
  // generate access token
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = Number(process.env.ACCESS_TOKEN_EXP);
  const env = process.env.NODE_ENV;
  const clientDomain = process.env.CLIENT_DOMAIN;

  if (!secret || !expiresIn || !env || !clientDomain) {
    throw new Error("Secret tokens are not set in cookies.ts");
  }

  const accessToken = jwt.sign({ userId }, secret, { expiresIn });

  // attach cookie
  const sameSite: "lax" | "strict" | "none" =
    env === "production" ? "lax" : "strict";

  const cookieOptions = {
    expires: new Date(Date.now() + expiresIn),
    httpOnly: true,
    secure: env === "production",
    path: "/",
    sameSite,
    domain: env === "production" ? clientDomain : "localhost",
  };

  res.cookie("accessToken", accessToken, cookieOptions);

  return accessToken;
};
