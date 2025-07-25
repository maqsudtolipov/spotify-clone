import { NextFunction, Request, Response } from "express";
import { loginService } from "../../services/auth/loginService";
import { attachAccessToken } from "../../services/auth/cookies";

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

    attachAccessToken(res, user.id);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (e) {
    next(e);
  }
};
