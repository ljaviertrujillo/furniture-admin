import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./input.scss";
import { InputProps } from "./models/input.model";
import { useState } from "react";
import { classNames } from "../../../utilities";

export interface OptionType {
  id?: string;
  title: string;
  description: string;
}

interface SelectProps<T extends OptionType> extends InputProps {
  options?: T[];
  onChange?: (value: T) => void;
}

export default function Select<T extends OptionType>({
  name,
  label,
  options,
  onChange,
}: SelectProps<T>) {
  const [option, setOption] = useState(options && options[0].title);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (option: T) => {
    setOption(option.title);
    onChange && onChange(option);
  };

  return (
    <div
      className="form-floating select-input"
      onClick={() => setIsOpen(!isOpen)}
      id={name}
    >
      <div className=" select-content">
        <span className="button">{label}</span>
        {option}
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <ul className={classNames("select", isOpen ? "expanded" : "")}>
        {options?.map((option) => (
          <li
            key={option.id}
            className="option"
            onClick={() => handleClick(option)}
          >
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
