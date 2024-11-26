import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const SubmitButton = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: "12px",
  backgroundColor: theme.palette.primary.dark,
  paddingX: 3,
  paddingY: 3,
  color: "white",
  transition: "all 0.3s ease-in-out",
}));
export const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  fontSize: "0.6rem",
  minWidth: "auto",
  lineHeight: 1.2,
  transition: "all 0.3s ease-in-out",
}));
export const LogoutButton = styled(Button)(({ theme }) => ({
  fontSize: "9px",
  borderRadius: "12px",
  backgroundColor: theme.palette.primary.dark,
  color: "white",
  fontWeight: "bold",
}));
