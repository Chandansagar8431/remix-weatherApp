import { Form } from "@remix-run/react";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Box } from "@mui/material";
import { List } from "~/components/listView";
import { CustomButton } from "./Button";
import { CityListProps, Position } from "~/types/definedType";
import { Modal } from "@mui/material";
import { useState } from "react";

export function Citylist({
  city,
  id,
  setCityWeatherInfo,
  setShowDetails,
  ciitesWeatherList,
  cityWeather,
}: CityListProps) {
  const [notFoundCity, setNotFoundCity] = useState(false);
  const [clickPosition, setClickPosition] = useState<Position | null>(null);
  const handleClose = () => {
    setNotFoundCity(false);
  };
  const handleClick = (e: any, code: number) => {
    const weatherDetails: any = ciitesWeatherList.find((cityWeather: any) =>
      cityWeather.location?.name.toLowerCase().includes(city.toLowerCase())
    );
    if (weatherDetails) {
      setShowDetails(true);
      setCityWeatherInfo(weatherDetails);
    }

    if (cityWeather?.error?.code === code) {
      const { clientX, clientY } = e;
      setClickPosition({ x: clientX + 75, y: clientY - 19 });
      setNotFoundCity(true);
    }
  };
  return (
    <>
      <List sx={{ backgroundColor: "" }}>
        <Typography variant="h6" padding="2px" fontWeight="500" color="">
          {city}
        </Typography>

        <Form method="post">
          <input type="hidden" name="id" value={id} />
          <CustomButton>
            <InfoIcon
              fontSize="small"
              color="action"
              onClick={(e) => handleClick(e, cityWeather?.error?.code || 1)}
            />
          </CustomButton>
          <CustomButton name="action" type="submit" value="delete">
            <DeleteIcon fontSize="small" color="action" />
          </CustomButton>
        </Form>
        <Modal
          open={notFoundCity}
          onClose={handleClose}
          BackdropProps={{
            sx: { backgroundColor: "transparent" },
          }}>
          <Box
            sx={{
              backgroundColor: "#748392",
              height: "40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              top: clickPosition?.y,
              left: clickPosition?.x,
              padding: "4px",
              paddingLeft: "10px",
              borderRadius: "5px",
            }}>
            <Typography color="white">
              {cityWeather.error?.message} Please delete the city and try with
              proper one
            </Typography>

            <CustomButton
              onClick={handleClose}
              sx={{ color: "white", fontSize: "16px", marginLeft: "3px" }}>
              x
            </CustomButton>
          </Box>
        </Modal>
      </List>
    </>
  );
}
