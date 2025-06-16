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
    // const newUser = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    //   imgId: "test",
    // };
    //
    // const user = await prisma.user.create({ data: newUser });

    const user = await signUpService(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (e) {
    next(e);
  }
};
