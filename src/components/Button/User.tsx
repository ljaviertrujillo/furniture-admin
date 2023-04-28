import { classNames } from "../../utilities";
import { ButtonType } from "./UtilityButton";

interface Props {
  name?: string;
  lastName?: string;
  type: ButtonType;
  handle?: () => void;
}

export default function User({ type, name, lastName, handle }: Props) {
  return (
    <button
      type="button"
      className={classNames("btn-user", type)}
      onClick={handle}
    >
      <div className="label">J</div>
      {type !== ButtonType.LARGE ? <span>Trujillo J</span> : null}
    </button>
  );
}
