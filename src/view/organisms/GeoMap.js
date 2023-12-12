import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LatLng } from "../../nonview/base";

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
    const { latLng, onChangeCenter } = this.props;

    return (
      <MapContainer
        center={latLng.latLng}
        zoom={LatLng.DEFAULT_ZOOM}
        zoomControl={false}
      >
        <EventComponent onChangeCenter={onChangeCenter} />
        <TileLayer url={URL_FORMAT} />
      </MapContainer>
    );
  }
}
