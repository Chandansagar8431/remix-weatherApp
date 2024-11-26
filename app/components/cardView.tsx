import { Box, Typography } from "@mui/material";
import { viewKeysInUse } from "~/helper/contant";
import {
  weatherDeatailsViewKeys,
  flattenObjectForCardView,
} from "~/helper/helper";
import { useTheme } from "@emotion/react";

export interface WeatherProps {
  cityWeatherInfo: {
    current: {
      [key: string]: unknown;
    };
  } | null;
}
export const WeatherCardView = ({ cityWeatherInfo }: WeatherProps | null) => {
  const objectForView = flattenObjectForCardView(cityWeatherInfo?.current);
  console.log(objectForView, "view");
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "55%",
        display: "inline-block",
        position: "absolute",
        borderRadius: "5px",
        top: "250px",
        left: "350px",
        maxHeight: 300,
        overflowY: "auto",
        overflowX: "hidden",
      }}>
      <Box
        style={{ listStyle: "none" }}
        sx={{
          display: "flex",
          flexDirection: "column",

          // flexWrap: "wrap",
          // width: "100%",
          gap: 0,
          backgroundColor: theme.palette.primary.light,
          padding: 2,
          borderRadius: 2,
          border: `4px solid ${theme.palette.neutral.medium}`,
          position: "relative",
        }}>
        <Typography
          fontWeight="bold"
          fontSize="30px"
          sx={{
            width: "100%",
          }}>
          Weather details of {cityWeatherInfo.location.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "white",
            paddingX: "10px",
            borderRadius: 1,
            boxShadow: 4,
            textAlign: "center",
            border: "1px solid black",
          }}>
          <span>City name</span>
          <span>{cityWeatherInfo.location.name}</span>
        </Box>
        {Object.entries(objectForView).map(([key, value]) => {
          if (viewKeysInUse.has(key)) {
            // const renderValue =
            //   typeof value === "string" || typeof value === "number"
            //     ? value
            //     : null;
            return (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "white",
                  paddingX: "10px",
                  borderRadius: 1,
                  boxShadow: 1,
                  textAlign: "center",
                  border: "1px solid black",
                }}>
                <span>{weatherDeatailsViewKeys(key)}</span>
                <br />
                {value.toString().includes("//cdn") ? (
                  <img
                    src={value}
                    alt="condition-icons"
                    style={{
                      color: "#3C4957",
                      width: "34px",
                      height: "18px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  />
                ) : (
                  <span>{value}</span>
                )}
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
};
