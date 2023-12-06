import { Box } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";

export default function QRView({ latLng }) {
  return (
    <Box>
      <QRCode value={latLng.googleMapsURL} />
    </Box>
  );
}
