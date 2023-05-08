import "./card.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { classNames } from "../../../../../utilities";
import { VscClose } from "react-icons/vsc";
import ConfirmButton from "../../../../../components/Button/ConfirmButton";
import { icons } from "../../../../../components/Icons/IconsLibrary";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  iconIndex?: number;
  handleRemove: () => void;
}

export default function Card({
  title,
  description,
  handleRemove,
  image,
  iconIndex,
}: CardProps) {
  const [menu, setMenu] = useState<boolean>(false);
  const selectedIcon = icons.find(icon => icon.id === iconIndex)?.icon

  return (
    <div className={classNames("card-container ", menu ? "collapsed" : "")}>
      <div className="card">
        <div className="card-content">
          <div style={{backgroundImage: `url(${image})`}} className={classNames(!!iconIndex ? 'icon-container' : 'image')}>
            {iconIndex && <div className="card-icon">{selectedIcon }</div>}
          </div>
          <div className="info">
            <span className="title">{title}</span>
            <p className="description">{description}</p>
          </div>
        </div>
        <button type="button" className="menu" onClick={() => setMenu(!menu)}>
          {menu ? <VscClose /> : <BsThreeDotsVertical />}
        </button>
      </div>
      <ConfirmButton state={menu} handle={handleRemove} />
    </div>
  );
}
