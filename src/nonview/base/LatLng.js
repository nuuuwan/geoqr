export default class LatLng {
  static PRECISION = 4;
  static ZOOM = 19;
  constructor(latLng) {
    this.latLng = latLng;
  }

  get lat() {
    return this.latLng[0];
  }

  get lng() {
    return this.latLng[1];
  }

  toString() {
    const [lat, lng] = this.latLng;
    return `${lat.toFixed(LatLng.PRECISION)}°N, ${lng.toFixed(
      LatLng.PRECISION
    )}°E`;
  }

  get uri() {
    const [lat, lng] = this.latLng;
    return `geo:${lat},${lng}`;
  }

  get googleMapsURL() {
    return `https://www.google.com/maps/place/${this.lat},${this.lng}/@${this.lat},${this.lng},${LatLng.ZOOM}z`;
  }
}
