import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { prisma } from "./prisma.server";
import bcrypt from "bcryptjs";

const authenticator = new Authenticator<any>(sessionStorage);

const formStrategy = new FormStrategy(async ({ form }) => {
  const name = form.get("username") as string;
  const password = form.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { name },
    include: {
      city: true,
    },
  });

  if (!user) {
    console.log("you entered a wrong username");
    throw new AuthorizationError();
  }

  const passwordsMatch = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!passwordsMatch) {
    console.log("you entered a wrong password");
    throw new AuthorizationError();
  }
  return user;
});

authenticator.use(formStrategy, "form");

export { authenticator };
