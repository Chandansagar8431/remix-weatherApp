import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const FlexBetween = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
  alignItems: "center",
}));
