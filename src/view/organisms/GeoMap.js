import { Component } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Circle,
  Polyline,
} from "react-leaflet";
import { LatLng } from "../../nonview/base";
import { COLOR } from "../Style";
import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function EventComponent({ onChangeCenterAndZoom }) {
  useMapEvents({
    moveend: (e) => {
      const centerRaw = e.target.getCenter();
      const center = [centerRaw.lat, centerRaw.lng];
      const zoom = e.target.getZoom();
      onChangeCenterAndZoom(center, zoom);
    },
  });
  return null;
}

export default class GeoMap extends Component {
  render() {
    const { latLngList, onChangeCenterAndZoom } = this.props;

    const latLngStart = (
      latLngList.length > 0 ? latLngList.item(0) : LatLng.DEFAULT_LATLNG
    ).latLng;

    const latLngEnd = (
      latLngList.length > 0 ? latLngList.item(-1) : LatLng.DEFAULT_LATLNG
    ).latLng;

    const RADIUS = 10;
    return (
      <MapContainer
        center={latLngEnd}
        zoom={LatLng.DEFAULT_ZOOM}
        zoomControl={false}
      >
        <EventComponent onChangeCenterAndZoom={onChangeCenterAndZoom} />
        <TileLayer url={URL_FORMAT} />

        <Polyline
          positions={latLngList.latLngList.map((x) => x.latLng)}
          color={COLOR.ORANGE}
          weight={RADIUS}
        />
        <Circle
          radius={RADIUS}
          center={latLngStart}
          color={COLOR.GREEN}
          fillOpacity={1}
        />
        <Circle
          radius={RADIUS}
          center={latLngEnd}
          color={COLOR.RED}
          fillOpacity={1}
        />
      </MapContainer>
    );
  }
}
