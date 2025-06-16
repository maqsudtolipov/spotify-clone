import prisma from "../../config/prisma.config";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcryptjs";

interface LoginService {
  email: string;
  password: string;
}

export const loginService = async (data: LoginService) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      password: true,
    },
  });
  if (!user) throw new AppError("Invalid email or password", 401);

  // Validate passwords
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new AppError("Invalid email or password", 401);

  return null;
};
