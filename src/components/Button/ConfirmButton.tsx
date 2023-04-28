import "./buttons.scss";
import { ReactNode, useState } from "react";
import { VscCheck, VscClose, VscEdit, VscTrash } from "react-icons/vsc";
import { classNames } from "../../utilities";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ConfirmButton {
  handle: () => void;
  state: boolean
}

export default function ConfirmButton({ handle, state }: ConfirmButton) {
  const [isConfirm, setIsConfirm] = useState(false);

  return (
    <>
      <div className={classNames("confirm-btn", state ? "collapsed" : "")}>
        {isConfirm ? null : (
          <>
            <button
              type="button"
              className={classNames("btn", "edit")}
              onClick={() => setIsConfirm(true)}
            >
              <VscEdit />
            </button>
            <button
              type="button"
              className={classNames("btn", "trash")}
              onClick={() => setIsConfirm(true)}
            >
              <VscTrash />
            </button>
          </>
        )}
        {isConfirm ? (
          <>
            <button type="button" className="check" onClick={handle}>
              <VscCheck />
            </button>
            <button
              type="button"
              className="close"
              onClick={() => setIsConfirm(false)}
            >
              <VscClose />
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}
