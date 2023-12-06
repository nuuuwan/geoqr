import { Box, Typography } from "@mui/material";

export default function QRView({ latLng }) {
  return (
    <Box>
      <Typography variant="h6">{JSON.stringify(latLng)}</Typography>
    </Box>
  );
}
