import "./input.scss";
import { classNames } from "../../../utilities";
import { InputProps } from "./models/input.model";
import { Field, FieldProps } from "formik";
import { useState } from "react";

export default function InputTextField({
  error,
  label,
  ...props
}: InputProps & { label: string, error: boolean }) {
  
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Field name={props.name}>
      {({ field }: FieldProps) => (
        <div
          className={classNames("form-floating", error ? 'error' : '',  isFocused ? "focused" : "")}
        >
          <input
            id={field.name}
            type="text"
            className="form-control"
            placeholder=" "
            {...field}
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <label htmlFor={field.name}>{label}</label>
        </div>
      )}
    </Field>
  );
}
