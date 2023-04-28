import { useContext } from "react";
import "./config-aside.scss";
import { WebContext } from "../../../../../context/Web/WebContext";
import { classNames } from "../../../../../utilities";
import PrimaryButton from "../../../../../components/Button/PrimaryButton";
import { MdPublish } from "react-icons/md";
import { TypeButton } from "../../../../../components/Button/SecondaryButton";

interface Props {
  handle?: () => void;
  main?: React.ReactNode;
  header?: React.ReactNode;
  headerTitle: string;
}

export default function ConfigAside({
  handle,
  main,
  header,
  headerTitle,
}: Props) {
  const { isOpen } = useContext(WebContext);

  return (
    <aside className={classNames("config", isOpen ? "expanded" : "")}>
      <section
        className={classNames("header", header !== undefined ? "nav" : "")}
      >
        {header !== undefined ? header : <span>{headerTitle}</span>}
      </section>
      <section
        className={classNames("main", header !== undefined ? "nav" : "")}
      >
        {main}
      </section>
      <section className="footers">
        <PrimaryButton
          title="Publicar"
          icon={<MdPublish />}
          handle={handle}
          typeButton={TypeButton.BUTTON}
        />
      </section>
    </aside>
  );
}
