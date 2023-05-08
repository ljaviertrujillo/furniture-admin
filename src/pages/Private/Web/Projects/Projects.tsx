import "./projects.scss";
import { useContext } from "react";
import { WebContext } from "../../../../context/Web/WebContext";
import { classNames } from "../../../../utilities";
import { ConfigAside } from "../components";
import ProjectsMain from "./ProjectsMain";

export default function Projects() {
  const { isOpen, setIsOpen } = useContext(WebContext);

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside headerTitle="Proyectos" main={<ProjectsMain />} />
      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview"></section>
      </div>
    </div>
  );
}
