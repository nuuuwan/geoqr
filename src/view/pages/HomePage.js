import { Component } from "react";
import { CircularProgress, Box } from "@mui/material";
import { URLContext, LatLng } from "../../nonview/base";
import { PositionTargetImage } from "../atoms";
import { BottomNavigation, QRView } from "../molecules";
import { GeoMap } from "../organisms";
import HomePageStyle from "./HomePageStyle";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.getContext();
    let latLngList = [];
    if (context.latLngList) {
      latLngList = LatLng.listFromString(context.latLngList);
    }
    this.state = { latLngList, isPlaying: false };
    this.setURLContext(this.state);
  }

  setURLContext(state) {
    const { latLngList } = state;
    const context = { latLngList: LatLng.listToString(latLngList) };
    URLContext.setContext(context);
  }

  setStateAndURLContext(state) {
    this.setState(state, function () {
      this.setURLContext(state);
    });
  }

  async componentDidMount() {}

  async onChangeCenterAndZoom(center) {
    const { isPlaying } = this.state;
    if (!isPlaying) {
      return;
    }
    let { latLngList } = this.state;
    const latLng = new LatLng(center);
    latLngList.push(latLng);
    this.setStateAndURLContext({ latLngList });
  }

  onClickRewind() {
    let { latLngList } = this.state;
    if (latLngList.length >= 1) {
      latLngList.pop();
    }
    this.setStateAndURLContext({ latLngList });
  }

  onClickPlay() {
    this.setState({ isPlaying: true });
  }

  onClickStop() {
    this.setState({ isPlaying: false });
  }

  render() {
    const { latLngList, isPlaying } = this.state;

    if (!latLngList) {
      return <CircularProgress />;
    }
    return (
      <Box>
        <Box sx={HomePageStyle.BODY}>
          <QRView latLngList={latLngList} />
          <GeoMap
            key={"GeoMap-" + JSON.stringify(LatLng.listToString(latLngList))}
            latLngList={latLngList}
            onChangeCenterAndZoom={this.onChangeCenterAndZoom.bind(this)}
          />{" "}
          <PositionTargetImage />
        </Box>
        <Box sx={HomePageStyle.FOOTER}>
          <BottomNavigation
            onClickRewind={this.onClickRewind.bind(this)}
            onClickPlay={this.onClickPlay.bind(this)}
            onClickStop={this.onClickStop.bind(this)}
            isPlaying={isPlaying}
            latLngList={latLngList}
          />
        </Box>
      </Box>
    );
  }
}
