import { Response } from "express";
import jwt from "jsonwebtoken";

export const attachAccessToken = (res: Response, userId: string) => {
  // generate access token
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = process.env.ACCESS_TOKEN_EXP;

  if (!secret || !expiresIn || !process.env.NODE_ENV) {
    console.log("Secret not set");
    return;
  }

  const accessToken = jwt.sign({ userId }, secret, { expiresIn: 10 });

  // attach cookie
  const sameSite: "lax" | "strict" | "none" =
    process.env.NODE_ENV === "production" ? "lax" : "strict";

  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRATION)),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite,
    domain:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_DOMAIN
        : "localhost",
  };

  res.cookie("accessToken", accessToken, cookieOptions);

  return accessToken;
};
