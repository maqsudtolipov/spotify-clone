import { Request, Response, NextFunction } from "express";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(201).json({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};
