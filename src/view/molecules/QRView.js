import { Box } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";

export default function QRView({ latLngList }) {
  const url = latLngList.geoQRURL;
  console.debug({ url });
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <QRCode value={url} style={{ height: 160 }} />
    </Box>
  );
}
