import { NextFunction, Request, Response } from "express";
import { loginService } from "../../services/auth/loginService";
import { attachToken } from "../../services/auth/cookies";
import prisma from "../../config/prisma.config";

export const loginController = async (
  req: Request<
    {},
    {},
    {
      email: string;
      password: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await loginService(req.body);

    attachToken(res, user.id, "access");
    const { token, expiresAt } = attachToken(res, user.id, "refresh");

    await prisma.refreshToken.create({
      data: {
        token: token,
        userId: user.id,
        expiresAt,
      },
    });

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (e) {
    next(e);
  }
};
