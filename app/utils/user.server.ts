import bcrypt from "bcryptjs";
// import type { RegisterForm } from "./types.server";
import type { RegisterForm } from "../types/definedType";
import { prisma } from "./prisma.server";

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 12);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: passwordHash,
    },
  });
  return { id: newUser.id, name: user.name, email: user.email };
};
