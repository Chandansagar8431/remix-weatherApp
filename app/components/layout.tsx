import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const LayoutBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.palette.background.alt,
  margin: "0px",
  padding: "0px",
}));
export const LoginLayout = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 2,
  backgroundColor: theme.palette.background.alt,
}));
export const CityWeatherLayout = styled(Box)(({}) => ({
  display: "flex",
  width: "25%",
  justifyContent: "space-between",
  alignItems: "center",
}));
