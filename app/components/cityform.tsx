import React, { useState } from "react";
import { Form } from "@remix-run/react";
import { Box, Typography, OutlinedInput } from "@mui/material";
import { CustomButton } from "./Button";
import { theme } from "~/theme";

export function Cityform() {
  const [inputCity, setInputCity] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputCity(e.target.value);
  };
  return (
    <>
      <Form method="post">
        <Box>
          <Typography fontWeight="600">Enter city</Typography>
          <OutlinedInput
            color="primary"
            size="small"
            type="text"
            name="city"
            id="city"
            sx={{ border: "1px solid" }}
            value={inputCity}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <CustomButton
          sx={{
            fontSize: "12px",
            color: "white",
            backgroundColor: theme.palette.primary.dark,
            marginTop: "5px",
          }}
          type="submit"
          name="action"
          value="new city"
          onClick={() => setTimeout(() => setInputCity(""), 1000)}>
          Add City
        </CustomButton>
      </Form>
    </>
  );
}
