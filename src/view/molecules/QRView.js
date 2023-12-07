import { Box } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";
import { LatLng } from "../../nonview/base";

export default function QRView({ latLngList }) {
  const url = LatLng.getGeoQRURL(latLngList);
  console.debug({ url });
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <QRCode value={url} style={{ height: 160 }} />
    </Box>
  );
}
