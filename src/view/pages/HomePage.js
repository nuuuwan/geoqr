import { Component } from "react";
import { CircularProgress, Box } from "@mui/material";
import { Geo } from "../../nonview/base";
import { GeoView } from "../atoms";
import { QRView } from "../molecules";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { latLng: Geo.DEFAULT_LATLNG };
  }

  async componentDidMount() {
    const latLng = await Geo.getLatLng();
    this.setState({ latLng });
  }

  render() {
    const { latLng } = this.state;
    console.debug({ latLng });
    if (!latLng) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <GeoView latLng={latLng} />
        <QRView latLng={latLng} />
      </Box>
    );
  }
}
