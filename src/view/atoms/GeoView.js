import { Link } from "@mui/material";

export default function GeoView({ latLng }) {
  return (
    <Link href={latLng.googleMapsURL} underline="none" target="_blank">
      {latLng.toString()}
    </Link>
  );
}
