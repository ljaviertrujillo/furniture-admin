import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export enum NextButtonType {
  NEXT = "next",
  BACK = "back",
}

export default function NextBackButton({ type, handle }: { type: NextButtonType, handle: () => void }) {
  return (
    <button type="button" className="next-btn" onClick={handle}>
      {type === NextButtonType.BACK ? <BsChevronLeft /> : <BsChevronRight />}
    </button>
  );
}
