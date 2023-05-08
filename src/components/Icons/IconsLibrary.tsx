import "./icons-library.scss";
import {
  BsShieldCheck,
  BsShieldFillCheck,
  BsShieldFillPlus,
  BsShieldPlus,
  BsShieldShaded,
  BsTrophyFill,
  BsTrophy,
} from "react-icons/bs";
import {
  MdHighQuality,
  MdOutlineHighQuality,
  MdOutlinePayment,
  MdContactSupport,
  MdSupportAgent,
  MdOutlineContactSupport,
  MdPriceCheck,
  MdOutlineLocalShipping,
  MdLocalShipping,
} from "react-icons/md";
import { IoPricetagsOutline, IoPricetagsSharp } from "react-icons/io5";
import {
  RiShieldCheckFill,
  RiShieldCheckLine,
  RiSecurePaymentFill,
  RiSecurePaymentLine,
} from "react-icons/ri";
import { GiReturnArrow, GiLaurelsTrophy, GiPriceTag } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { ImPriceTag } from "react-icons/im";
import { FaShippingFast } from "react-icons/fa";
import { useState } from "react";
import { classNames } from "../../utilities";

export const icons = [
  { id: 1, icon: <BsShieldCheck /> },
  { id: 2, icon: <BsShieldFillCheck /> },
  { id: 3, icon: <BsShieldFillPlus /> },
  { id: 4, icon: <BsShieldPlus /> },
  { id: 5, icon: <BsShieldShaded /> },
  { id: 6, icon: <RiShieldCheckFill /> },
  { id: 7, icon: <RiShieldCheckLine /> },
  { id: 8, icon: <RiSecurePaymentFill /> },
  { id: 9, icon: <RiSecurePaymentLine /> },
  { id: 10, icon: <GiReturnArrow /> },
  { id: 11, icon: <BsTrophyFill /> },
  { id: 12, icon: <BsTrophy /> },
  { id: 13, icon: <GiLaurelsTrophy /> },
  { id: 14, icon: <MdHighQuality /> },
  { id: 15, icon: <MdOutlineHighQuality /> },
  { id: 16, icon: <MdOutlinePayment /> },
  { id: 17, icon: <MdPriceCheck /> },
  { id: 18, icon: <IoPricetagsOutline /> },
  { id: 19, icon: <IoPricetagsSharp /> },
  { id: 20, icon: <GiPriceTag /> },
  { id: 21, icon: <ImPriceTag /> },
  { id: 22, icon: <MdContactSupport /> },
  { id: 23, icon: <MdOutlineContactSupport /> },
  { id: 24, icon: <BiSupport /> },
  { id: 25, icon: <MdSupportAgent /> },
  { id: 26, icon: <MdOutlineLocalShipping /> },
  { id: 27, icon: <MdLocalShipping /> },
  { id: 28, icon: <FaShippingFast /> },
];

export default function IconsLibrary({
  onChange,
}: {
  onChange: (index: number) => void;
}) {
  const [iconIndex, setIconIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setIconIndex(index);
    onChange(index);
  };

  return (
    <div className="library-icons">
      {icons.map((element) => (
        <div
          className={classNames(
            "icon",
            iconIndex === element.id ? "selected" : ""
          )}
          key={element.id}
          onClick={() => handleClick(element.id)}
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
}
