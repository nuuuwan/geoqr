import { LatLng } from "../../nonview/base";

import { COLOR } from "../Style";

export function FloatView({ f }) {
  const s = f.toFixed(LatLng.PRECISION);
  const n = s.length;
  return (
    <span>
      <span style={{ fontSize: "150%", color: COLOR.GREEN }}>
        {s.substring(0, n - 6)}
      </span>
      <span style={{ fontSize: "125%", color: COLOR.ORANGE }}>
        {s.substring(n - 6, n - 3)}
      </span>
      <span style={{ fontSize: "100%", color: COLOR.RED }}>
        {s.substring(n - 3, n)}
      </span>
    </span>
  );
}

export default function LatLngView({ latLng }) {
  return (
    <div>
      <FloatView f={latLng.lat} />
      {", "}
      <FloatView f={latLng.lng} />
    </div>
  );
}
