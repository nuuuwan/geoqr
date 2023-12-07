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
  static DEFAULT_ZOOM = 18;
  static DELIM_LIST_STR = ";";
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
    return toSigned(lat, ["N", "S"]) + "," + toSigned(lng, ["E", "W"]);
  }

  static fromString(latLngStr) {
    const [lat, lng] = latLngStr.split(",").map((s) => fromSigned(s));
    return new LatLng([lat, lng]);
  }

  static listFromString(latLngListStr) {
    const latLngStrList = latLngListStr.split(LatLng.DELIM_LIST_STR);
    return latLngStrList.map((latLngStr) => LatLng.fromString(latLngStr));
  }

  static listToString(latLngList) {
    return latLngList
      .map((latLng) => latLng.toString())
      .join(LatLng.DELIM_LIST_STR);
  }

  static getBounds(latLngList) {
    const latList = latLngList.map((latLng) => latLng.lat);
    const lngList = latLngList.map((latLng) => latLng.lng);
    const latMin = Math.min(...latList);
    const latMax = Math.max(...latList);
    const lngMin = Math.min(...lngList);
    const lngMax = Math.max(...lngList);
    return [
      [latMin, lngMin],
      [latMax, lngMax],
    ];
  }

  static getGeoQRURL(latLngList) {
    const url = URLContext.contextToURL({
      latLngList: LatLng.listToString(latLngList),
    });
    return url;
  }
}
