import LatLng from "./LatLng.js";
import URLContext from "./URLContext.js";

export default class LatLngList {
  constructor(latLngList) {
    this.latLngList = latLngList;
  }

  get length() {
    return this.latLngList.length;
  }

  push(latLng) {
    this.latLngList.push(latLng);
  }

  item(index) {
    if (index < 0) {
      index = this.latLngList.length + index;
    }
    return this.latLngList[index];
  }

  static fromString(latLngListStr) {
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
    return new LatLngList(latLngList);
  }

  toString() {
    if (this.latLngList.length === 0) {
      return "";
    }
    let sList = [];
    let [latPrev, lngPrev] = LatLng.DEFAULT_LATLNG.latLng;
    for (let latLng of this.latLngList) {
      const [lat, lng] = latLng.latLng;
      const [dLat, dLng] = [lat - latPrev, lng - lngPrev];
      sList.push([dLat, dLng].map((f) => LatLng.quant(f)).join(","));
      [latPrev, lngPrev] = [lat, lng];
    }
    return sList.join(LatLng.DELIM_LIST_STR);
  }

  get bounds() {
    const latList = this.latLngList.map((latLng) => latLng.lat);
    const lngList = this.latLngList.map((latLng) => latLng.lng);
    const latMin = Math.min(...latList);
    const latMax = Math.max(...latList);
    const lngMin = Math.min(...lngList);
    const lngMax = Math.max(...lngList);
    return [
      [latMin, lngMin],
      [latMax, lngMax],
    ];
  }

  get geoQRURL() {
    const url = URLContext.contextToURL({
      latLngList: this.latLngList.toString(),
    });
    return url;
  }
}
