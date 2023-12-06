import URLContext from "./URLContext";

function toSigned(x, signs) {
  const sign = x > 0 ? signs[0] : signs[1];
  return `${Math.abs(x).toFixed(LatLng.PRECISION)}${sign}`;
}

function fromSigned(s) {
  const sign = s.slice(-1);
  const x = parseFloat(s.slice(0, -1));
  return sign === "N" || sign === "E" ? x : -x;
}

export default class LatLng {
  static PRECISION = 6;
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
    const url = URLContext.contextToURL({ latLng: this.toString()});
    return url;
  }

  static fromString(latLngStr) {
    const [lat, lng] = latLngStr.split(",").map((s) => fromSigned(s));
    return new LatLng([lat, lng]);
  }

  toString() {
    const [lat, lng] = this.latLng;
    return toSigned(lat, ["N", "S"]) + "," + toSigned(lng, ["E", "W"]);
  }
}
