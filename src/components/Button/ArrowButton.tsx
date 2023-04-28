import { useContext } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { WebContext } from "../../context/Web/WebContext";

export default function ArrowButton() {
  const { isOpen, setIsOpen } = useContext(WebContext);
  return (
    <button
      type="button"
      className="arrow-btn"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <BsArrowBarLeft /> : <BsArrowBarRight />}
    </button>
  );
}
