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

function EventComponent({ onChangeCenter }) {
  useMapEvents({
    moveend: (e) => {
      const centerRaw = e.target.getCenter();
      const center = [centerRaw.lat, centerRaw.lng];
      const zoom = e.target.getZoom();
      onChangeCenter(center, zoom);
    },
    click: (e) => {
      const centerRaw = e.latlng;
      const center = [centerRaw.lat, centerRaw.lng];
      onChangeCenter(center);
    },
  });
  return null;
}

export default class GeoMap extends Component {
  render() {
    const { latLngList, onChangeCenter,currentLatLng } = this.props;

    const latLngStart = (
      latLngList.length > 0 ? latLngList.item(0) : currentLatLng
    ).latLng;

    const latLngEnd = (
      latLngList.length > 0 ? latLngList.item(-1) : currentLatLng
    ).latLng;

    const RADIUS = 10;
    return (
      <MapContainer
        center={latLngEnd}
        zoom={LatLng.DEFAULT_ZOOM}
        zoomControl={false}
      >
        <EventComponent onChangeCenter={onChangeCenter} />
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
