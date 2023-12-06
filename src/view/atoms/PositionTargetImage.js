import './PositionTargetImage.css';

export default function PositionTargetImage() {
  const src = process.env.PUBLIC_URL + "/position-target.png";
  return <img className="img-position-target" src={src} alt="img-position-target" />;
}
