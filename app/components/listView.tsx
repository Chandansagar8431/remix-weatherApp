import { Box } from "@mui/material";
import { styled } from "@mui/system";
export const ListView = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "2px",
  width: "100%",
  backgroundColor: theme.palette.neutral.medium,
  borderRadius: "4px",
  paddingX: "5px",
}));

export const List = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.light,
  alignItems: "center",
  margin: "2px",
  borderRadius: "2px",
}));
