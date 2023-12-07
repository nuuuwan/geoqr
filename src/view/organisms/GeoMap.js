import { Component } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Circle,
  Polyline,
} from "react-leaflet";
import { LatLng, Geo } from "../../nonview/base";
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
    const latLngEnd = (
      latLngList.length > 0
        ? latLngList[latLngList.length - 1]
        : Geo.DEFAULT_LATLNG
    ).latLng;
    const latLngStart = (
      latLngList.length > 0 ? latLngList[0] : Geo.DEFAULT_LATLNG
    ).latLng;

    return (
      <MapContainer
        center={latLngEnd}
        zoom={LatLng.DEFAULT_ZOOM}
        zoomControl={false}
      >
        <EventComponent onChangeCenterAndZoom={onChangeCenterAndZoom} />
        <TileLayer url={URL_FORMAT} />

        <Polyline
          positions={latLngList.map((x) => x.latLng)}
          color={COLOR.GREEN}
        />
        <Circle center={latLngStart} color={COLOR.ORANGE} fillOpacity={1} />
        <Circle center={latLngEnd} color={COLOR.GREEN} fillOpacity={1} />
      </MapContainer>
    );
  }
}
