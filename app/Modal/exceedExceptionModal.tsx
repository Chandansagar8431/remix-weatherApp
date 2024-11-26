import { Modal, Box, Typography } from "@mui/material";
import { CustomButton } from "~/components/Button";
import { WeatherModal } from "./weatheModal";
interface ExceedExceptionModalProps {
  exception: boolean;
  exceptionClose: () => void;
  data: any;
}
const ExceedExceptionModal = ({
  exception,
  exceptionClose,
  data,
}: ExceedExceptionModalProps) => {
  return (
    <Modal
      open={exception}
      onClose={exceptionClose}
      sx={{ position: "relative" }}
      BackdropProps={{
        sx: { backgroundColor: "transparent" }, // Makes the backdrop transparent
      }}>
      <Box
        sx={{
          backgroundColor: "#9B0A0A",
          height: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: "10px",
          left: "100px",
          padding: "4px",
          paddingLeft: "10px",
          borderRadius: "5px",
        }}>
        <Typography color="white" fontWeight="bold">
          {data}
        </Typography>

        <CustomButton
          onClick={exceptionClose}
          sx={{ color: "white", fontSize: "15px" }}>
          x
        </CustomButton>
      </Box>
    </Modal>
  );
};
export default ExceedExceptionModal;
