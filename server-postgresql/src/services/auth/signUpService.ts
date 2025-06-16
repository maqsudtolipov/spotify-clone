import prisma from "../../config/prisma.config";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcryptjs";

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
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const userData = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    imgId: "test",
  };

  return prisma.user.create({
    data: userData,
    select: { name: true, email: true },
  });
};
