import "./card.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { classNames } from "../../../../../utilities";
import { VscClose } from "react-icons/vsc";
import ConfirmButton from "../../../../../components/Button/ConfirmButton";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  handleRemove: () => void;
}

export default function Card({
  title,
  description,
  handleRemove,
  image,
}: CardProps) {
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <div className={classNames("card-container ", menu ? "collapsed" : "")}>
      <div className="card">
        <div className="card-content">
          {<img src={image} alt={title} />}
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
