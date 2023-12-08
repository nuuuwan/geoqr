import LatLng from "./LatLng.js";

export default class Geo {
  static async getLatLng(options) {
    const data = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
    const coords = data.coords;
    const [lat, lng] = [coords.latitude, coords.longitude];
    return new LatLng([lat, lng]);
  }
}
