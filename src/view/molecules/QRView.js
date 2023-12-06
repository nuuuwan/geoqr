import { Box } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";
import { GeoView } from "../atoms";
export default function QRView({ latLng }) {
  return (
    <Box>
      <QRCode value={latLng.geoQRURL} />
      <Box>
        <GeoView latLng={latLng} />
      </Box>
    </Box>
  );
}
