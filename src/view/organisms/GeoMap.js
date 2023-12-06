import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

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
    const { center, zoom, onChangeCenterAndZoom } = this.props;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <EventComponent onChangeCenterAndZoom={onChangeCenterAndZoom} />
        <TileLayer url={URL_FORMAT} />
      </MapContainer>
    );
  }
}
