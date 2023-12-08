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

  static listFromString(latLngListStr) {
    if (latLngListStr === "") {
      return [];
    }
    const sList = latLngListStr.split(LatLng.DELIM_LIST_STR);
    let [latPrev, lngPrev] = LatLng.DEFAULT_LATLNG.latLng;
    let latLngList = [];
    for (let s of sList) {
      const [dLat, dLng] = s.split(",").map((s) => LatLng.dequant(s));
      const [lat, lng] = [latPrev + dLat, lngPrev + dLng];
      latLngList.push(new LatLng([lat, lng]));
      [latPrev, lngPrev] = [lat, lng];
    }
    return latLngList;
  }

  static listToString(latLngList) {
    if (latLngList.length === 0) {
      return "";
    }
    let sList = [];
    let [latPrev, lngPrev] = LatLng.DEFAULT_LATLNG.latLng;
    for (let latLng of latLngList) {
      const [lat, lng] = latLng.latLng;
      const [dLat, dLng] = [lat - latPrev, lng - lngPrev];
      sList.push([dLat, dLng].map((f) => LatLng.quant(f)).join(","));
      [latPrev, lngPrev] = [lat, lng];
    }
    return sList.join(LatLng.DELIM_LIST_STR);
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
