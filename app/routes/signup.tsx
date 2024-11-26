import React, { useState } from "react";
import type { V2_MetaFunction } from "@remix-run/node";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { useActionData, Link } from "@remix-run/react";

import { authenticator } from "~/utils/auth.server";
import { createUser } from "~/utils/user.server";
import { LayoutBox, LoginLayout } from "~/components/layout";
import { Box, TextField, Typography } from "@mui/material";
import { SubmitButton } from "~/components/Button";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App login" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  return { user };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  const name = form.get("username");

  await createUser({ email, password, name });
  return redirect("/login");
};

export default function Signup() {
  const actionData = useActionData();
  const [formData, setFormData] = useState({
    username: actionData?.fields?.username || "",
    password: actionData?.fields?.password || "",
    email: actionData?.fields?.email || "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <LayoutBox>
      <LoginLayout>
        <Box
          sx={{
            borderRadius: "16px",
            backgroundColor: "white",
            padding: 6,
            width: "24rem",
          }}>
          <form method="POST">
            <Typography fontWeight="bold" variant="h5" margin="5px">
              Create an account
            </Typography>
            <TextField
              name="email"
              label="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
              sx={{ margin: "5px" }}
            />
            <TextField
              name="username"
              label="username"
              variant="outlined"
              fullWidth
              value={formData.username}
              onChange={(e) => handleInputChange(e, "username")}
              sx={{ margin: "5px" }}
            />
            <TextField
              name="password"
              label="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
              sx={{ margin: "5px" }}
            />
            <div className="w-full text-center mt-5">
              <SubmitButton
                sx={{ margin: "5px" }}
                type="submit"
                name="_action"
                value="Sign In"
                className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600">
                Create an account
              </SubmitButton>
            </div>
          </form>
        </Box>

        <Typography marginTop="5px">
          Already have an account?
          <Link to="/login">
            <span>Sign In</span>
          </Link>
        </Typography>
      </LoginLayout>
    </LayoutBox>
  );
}
