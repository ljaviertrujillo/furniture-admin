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
  options: T[];
  index: number;
  onChange?: (value: number) => void;
}

export default function Select<T extends OptionType>({
  name,
  label,
  options,
  index,
  onChange,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (option: number) => {
    onChange && onChange(option);
    setIsOpen(false)
  };

  return (
    <div
      className="form-floating select-input"
      onClick={() => setIsOpen(!isOpen)}
      id={name}
    >
      <div className=" select-content">
        <span className="button">{label}</span>
        {options[index].title}
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <ul className={classNames("select", isOpen ? "expanded" : "")}>
        {options?.map((option,i) => {
          return (
          <li
            key={option.id}
            className="option"
            onClick={() => handleClick(i)}
          >
            {option.title}
          </li>
        )})}
      </ul>
    </div>
  );
}
