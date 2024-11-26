import { Modal, Box } from "@mui/material";
import { WeatherCardView } from "~/components/cardView";
import { WeatherProps } from "~/components/cardView";
import { CustomButton } from "~/components/Button";

interface WeatherModalProps {
  showDetails: boolean;
  handleClose: () => void;
  cityWeatherInfo: WeatherProps;
}
export const WeatherModal = ({
  showDetails,
  handleClose,
  cityWeatherInfo,
}: WeatherModalProps) => {
  return (
    <Modal open={showDetails} onClose={handleClose}>
      <Box sx={{ display: "relative" }}>
        <WeatherCardView cityWeatherInfo={cityWeatherInfo} />
        <CustomButton onClick={handleClose}></CustomButton>
      </Box>
    </Modal>
  );
};
export default WeatherModal;
