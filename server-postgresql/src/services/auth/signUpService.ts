import prisma from "../../config/prisma.config";
import { AppError } from "../../errors/AppError";

interface SignUpService {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const signUpService = async (data: SignUpService) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // Hash password


  return null;
};
