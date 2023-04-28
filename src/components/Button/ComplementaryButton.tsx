import "./buttons.scss";
import { ButtonProps } from "./SecondaryButton";

export default function ComplementaryButton({
  icon,
  title,
  handle,
}: ButtonProps) {
  return (
    <button type="button" className="complementary-btn" onClick={handle}>
      {icon}
      {title}
    </button>
  );
}
