import URLContext from "./URLContext";

export default class LatLng {
  static PRECISION = 5;
  static QUANTUM = 10 ** LatLng.PRECISION;
  static DEFAULT_ZOOM = 18;
  static DELIM_LIST_STR = ";";
  static DEFAULT_LATLNG = new LatLng([6.917283873517496, 79.8647991483806]);

  constructor(latLng) {
    this.latLng = latLng;
  }

  get lat() {
    return this.latLng[0];
  }

  get lng() {
    return this.latLng[1];
  }

  get lngLat() {
    return [this.lng, this.lat];
  }

  get uri() {
    const [lat, lng] = this.latLng;
    return `geo:${lat},${lng}`;
  }

  get googleMapsURL() {
    return `https://www.google.com/maps/place/${this.lat},${this.lng}/@${this.lat},${this.lng},${LatLng.ZOOM}z`;
  }

  get geoQRURL() {
    const url = URLContext.contextToURL({ latLng: this.toString() });
    return url;
  }

  toString() {
    const [lat, lng] = this.latLng;
    return `${lat.toFixed(LatLng.PRECISION)},${lng.toFixed(LatLng.PRECISION)}`;
  }

  static fromString(latLngStr) {
    const [lat, lng] = latLngStr.split(",").map((s) => parseFloat(s));
    return new LatLng([lat, lng]);
  }

  static quant(f) {
    return parseInt(f * LatLng.QUANTUM).toString();
  }

  static dequant(s) {
    return parseFloat((parseInt(s) * 1.0) / LatLng.QUANTUM);
  }
}
