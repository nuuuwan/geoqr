import { Box, Typography } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";

export default function QRView({ latLngList }) {
  const url = latLngList.geoQRURL;

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <QRCode value={url} style={{ height: 120 }} />
      <Typography variant="h6">{latLngList.stats}</Typography>
    </Box>
  );
}
