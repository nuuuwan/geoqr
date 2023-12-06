import { Component } from "react";
import { CircularProgress, Box } from "@mui/material";
import { Geo, URLContext, LatLng } from "../../nonview/base";
import { GeoView } from "../atoms";
import { QRView } from "../molecules";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.getContext();
    let latLng = Geo.DEFAULT_LATLNG;
    if (context.latLng) {
      latLng = LatLng.fromString(context.latLng);
    }
    this.state = { latLng };
    this.setURLContext(this.state);
  }

  setURLContext(state) {
    const { latLng } = state;
    const context = { latLng };
    URLContext.setContext(context);
  }

  async componentDidMount() {

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
