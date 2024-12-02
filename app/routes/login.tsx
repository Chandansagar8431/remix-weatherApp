import React, { useState } from "react";
import type { V2_MetaFunction } from "@remix-run/node";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, Link } from "@remix-run/react";

import { authenticator } from "~/utils/auth.server";
import { LayoutBox, LoginLayout } from "~/components/layout";
import { SubmitButton } from "~/components/Button";
import { Typography, Box, TextField } from "@mui/material";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Weather App login" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  return user;
};

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export default function Login() {
  const actionData = useActionData();
  const [formData, setFormData] = useState({
    username: actionData?.fields?.username || "",
    password: actionData?.fields?.password || "",
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
            <Typography variant="h5" fontWeight="bold" margin="8px">
              Login
            </Typography>
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
                type="submit"
                name="=_action"
                value="Sign in"
                sx={{ margin: "5px" }}>
                Login
              </SubmitButton>
            </div>
          </form>
        </Box>
        <Typography marginTop="5px">
          Dont have an account?
          <Link to="/signup">
            <span>Signup</span>
          </Link>
        </Typography>
      </LoginLayout>
    </LayoutBox>
  );
}
