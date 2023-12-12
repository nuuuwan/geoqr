import { Box, Typography } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";
import { LatLngView } from "../atoms";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { COLOR } from "../Style";

const HEIGHT = 160;

export default function QRView({ latLng }) {
  const url = latLng.geoQRURL;

  const [copied, setCopied] = React.useState(false);

  const onClick = function () {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  const copyIcon = copied ? (
    <CheckCircleIcon sx={{ fontSize: "80%", color: COLOR.GREEN }} />
  ) : null;

  return (
    <Box sx={{ p: 1, textAlign: "center" }} onClick={onClick}>
      <QRCode value={url} style={{ height: HEIGHT }} />
      <LatLngView latLng={latLng} />
      <Typography variant="caption" sx={{ color: "#888" }}>
        Click QR Code to Copy Pin {copyIcon}
      </Typography>
    </Box>
  );
}
