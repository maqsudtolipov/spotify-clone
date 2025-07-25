import { NextFunction, Request, Response } from "express";
import { signUpService } from "../../services/auth/signUpService";
import { attachToken } from "../../services/auth/cookies";
import prisma from "../../config/prisma.config";

export const signUpController = async (
  req: Request<
    {},
    {},
    {
      name: string;
      email: string;
      password: string;
      passwordConfirm: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await signUpService(req.body);

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
      message: "User created successfully",
      user,
    });
  } catch (e) {
    next(e);
  }
};
