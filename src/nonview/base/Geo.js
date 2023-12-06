import LatLng from "./LatLng.js";

export default class Geo {
  static DEFAULT_LATLNG = new LatLng([6.917283873517496, 79.8647991483806]);
  static async getLatLng(options) {
    const data = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
    const coords = data.coords;
    const [lat, lng] = [coords.latitude, coords.longitude];
    return new LatLng([lat, lng]);
  }
}
