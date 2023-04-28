import { useState } from "react";
import "./input.scss";
import { InputProps, InputType } from "./models/input.model";
import { classNames } from "../../../utilities";
import { MdAttachMoney } from "react-icons/md";
import { Field, FieldProps } from "formik";

interface InputNumberProps extends InputProps {
  number: InputType;
}

export default function InputNumberField({
  label,
  ...props
}: InputNumberProps & { label: string }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Field  name={props.name}>
      {({ field }: FieldProps) => (
        <div
          className={classNames("form-floating", isFocused ? "focused" : "")}
        >
          {props.number === InputType.PRICE ? (
            <div className="icon-container">
              <MdAttachMoney />
            </div>
          ) : null}

          <input
            id={field.name}
            type="number"
            className={classNames(
              "form-control",
              props.number === InputType.PRICE ? "number" : ""
            )}
            placeholder=" "
            {...field}
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            min={0}
          />
          <label htmlFor={props.name}>{label}</label>
        </div>
      )}
    </Field>
  );
}
