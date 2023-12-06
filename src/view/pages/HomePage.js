import { Component } from "react";
import { CircularProgress, Box } from "@mui/material";
import { Geo, URLContext, LatLng } from "../../nonview/base";
import { GeoView, PositionTargetImage } from "../atoms";
import { QRView } from "../molecules";
import { GeoMap } from "../organisms";
import HomePageStyle from "./HomePageStyle";

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

  setStateAndURLContext(state) {
    this.setState(state, function () {
      this.setURLContext(state);
    });
  }

  async componentDidMount() {}

  async onChangeCenterAndZoom(center, zoom) {
    const latLng = new LatLng(center);
    this.setStateAndURLContext({ latLng });
  }

  render() {
    const { latLng } = this.state;

    if (!latLng) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <Box sx={HomePageStyle.BODY_TOP}>
          <QRView latLng={latLng} />
        </Box>
        <Box sx={HomePageStyle.BODY_BOTTOM}>
          <GeoMap
            center={latLng.latLng}
            zoom={18}
            onChangeCenterAndZoom={this.onChangeCenterAndZoom.bind(this)}
          />
          <PositionTargetImage />
        </Box>
      </Box>
    );
  }
}
