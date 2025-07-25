import { NextFunction, Request, Response } from "express";
import { signUpService } from "../../services/auth/signUpService";
import { attachToken } from "../../services/auth/cookies";

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
    attachToken(res, user.id, "refresh");

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user,
    });
  } catch (e) {
    next(e);
  }
};
