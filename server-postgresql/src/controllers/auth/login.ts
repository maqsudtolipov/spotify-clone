import { NextFunction, Request, Response } from "express";
import { loginService } from "../../services/auth/loginService";
import { attachToken } from "../../services/auth/cookies";

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

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (e) {
    next(e);
  }
};
