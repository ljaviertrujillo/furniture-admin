import "./input.scss";
import { useState } from "react";
import { classNames } from "../../../utilities";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { InputProps } from "./models/input.model";

export default function InputPassword({ name }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={classNames("form-floating", isFocused ? "focused" : "")}>
      <input
        id={name}
        type={viewPassword ? "text" : "password"}
        className="form-control"
        placeholder=" "
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label htmlFor={name}>Contraseña</label>
      <button
        type="button"
        className="viewButton"
        onClick={() => setViewPassword(!viewPassword)}
      >
        {viewPassword ? <VscEyeClosed /> : <VscEye />}
      </button>
    </div>
  );
}
