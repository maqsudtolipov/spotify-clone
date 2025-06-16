import { Request, Response, NextFunction } from "express";
import { signUpService } from "../../services/auth/signUpService";

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

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user,
    });
  } catch (e) {
    next(e);
  }
};
