import { Request, Response } from "express";

export const signUpController = async (req: Request, res: Response) => {
  res.status(201).json({
    status: "success",
  });
};
