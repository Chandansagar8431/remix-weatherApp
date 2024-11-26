import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const LandingLayout = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  backgroundColor: theme.palette.background.alt,
  overflowY: "auto",
  overflow: "scroll",
}));
