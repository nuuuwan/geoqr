import { Component } from "react";
import { CircularProgress, Box } from "@mui/material";
import { URLContext, LatLng } from "../../nonview/base";
import { PositionTargetImage } from "../atoms";
import { QRView } from "../molecules";
import { GeoMap } from "../organisms";
import HomePageStyle from "./HomePageStyle";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.getContext();
    let latLng = LatLng.DEFAULT_LATLNG;
    if (context.latLng) {
      latLng = LatLng.fromString(context.latLng);
    }
    this.state = { latLng };
    this.setURLContext(this.state);
  }

  setURLContext(state) {
    const { latLng } = state;
    const context = { latLng: latLng.toString() };
    URLContext.setContext(context);
  }

  setStateAndURLContext(state) {
    this.setState(state, function () {
      this.setURLContext(state);
    });
  }

  async componentDidMount() {}

  async onChangeCenter(center) {
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
        <Box sx={HomePageStyle.BODY}>
          <QRView latLng={latLng} />
          <GeoMap
            key={"GeoMap-" + latLng.toString()}
            latLng={latLng}
            onChangeCenter={this.onChangeCenter.bind(this)}
          />{" "}
          <PositionTargetImage />
        </Box>
      </Box>
    );
  }
}
