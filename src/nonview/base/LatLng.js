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

  getDistance(other) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    function getDistanceInM(lat1, lon1, lat2, lon2) {
      var R = 6_371_000; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    }

    return getDistanceInM(this.lat, this.lng, other.lat, other.lng);
  }

  static async getCurrentLatLng() {
    const options = {};
    const data = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
    const coords = data.coords;

    const [lat, lng] = [coords.latitude, coords.longitude];
    return new LatLng([lat, lng]);
  }
}
