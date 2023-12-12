import { Box } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";
import { LatLngView } from "../atoms";

const HEIGHT = 180;

export default function QRView({ latLng }) {
  const url = latLng.geoQRURL;

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <QRCode value={url} style={{ height: HEIGHT }} />
      <LatLngView latLng={latLng} />
    </Box>
  );
}
