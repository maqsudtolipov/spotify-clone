import { Request, Response, NextFunction } from "express";
import { loginService } from "../../services/auth/loginService";

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

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (e) {
    next(e);
  }
};
