import { Component } from "react";
import { CircularProgress, Box } from "@mui/material";
import { URLContext, LatLng, LatLngList } from "../../nonview/base";
import { PositionTargetImage } from "../atoms";
import { BottomNavigation, QRView } from "../molecules";
import { GeoMap } from "../organisms";
import HomePageStyle from "./HomePageStyle";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = URLContext.getContext();
    let latLngList = new LatLngList([]);
    if (context.latLngList) {
      latLngList = LatLngList.fromString(context.latLngList);
    }
    const currentLatLng =
      (latLngList.length > 0 && latLngList.item(-1)) || LatLng.DEFAULT_LATLNG;
    this.state = { latLngList, isPlaying: false, currentLatLng };
    this.setURLContext(this.state);
  }

  setURLContext(state) {
    const { latLngList } = state;
    const context = { latLngList: latLngList.toString() };
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
    let { latLngList } = this.state;
    const currentLatLng = new LatLng(center);
    if (isPlaying) {
      latLngList.push(currentLatLng);
    }
    this.setStateAndURLContext({ latLngList, currentLatLng });
  }

  onClickRewind() {
    let { latLngList } = this.state;
    if (latLngList.length >= 1) {
      latLngList.pop();
    }
    this.setStateAndURLContext({ latLngList, isPlaying: false });
  }

  onClickPlay() {
    const { currentLatLng } = this.state;
    let { latLngList } = this.state;
    latLngList.push(currentLatLng);

    this.setState({ isPlaying: true, latLngList });
  }

  onClickStop() {
    this.setState({ isPlaying: false });
  }

  onClickClear() {
    this.setStateAndURLContext({ latLngList: [], isPlaying: false });
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
            key={"GeoMap-" + JSON.stringify(latLngList.toString())}
            latLngList={latLngList}
            onChangeCenterAndZoom={this.onChangeCenterAndZoom.bind(this)}
          />{" "}
          <PositionTargetImage />
        </Box>
        <Box sx={HomePageStyle.FOOTER}>
          <BottomNavigation
            onClickClear={this.onClickClear.bind(this)}
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
