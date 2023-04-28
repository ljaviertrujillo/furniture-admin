import "./projects.scss";
import { useContext } from "react";
import { WebContext } from "../../../../../context/Web/WebContext";
import ConfigAside from "../ConfigAside/ConfigAside";
import { classNames } from "../../../../../utilities";
import ProjectForm from "../../../../../components/forms/ProjectForm";
import { ProjectContext } from "../../../../../context/Web/ProjectsContext";
import { ComplementaryButton } from "../../../../../components";
import { VscAdd, VscClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";
import { Card } from "../Card";

export default function Projects() {
  const { isOpen, setIsOpen, isFormVisible, setIsFormVisible } =
    useContext(WebContext);
  const projects = useSelector((state: AppStore) => state.project.data);
  const { deleteProject } = useContext(ProjectContext);

  const ProjectsMain = () => {
    const {} = useContext(ProjectContext);
    return (
      <>
        <ComplementaryButton
          icon={isFormVisible ? <VscClose /> : <VscAdd />}
          title={isFormVisible ? "Cerrar" : "Nuevo Proyecto"}
          handle={() => setIsFormVisible(!isFormVisible)}
        />

        {isFormVisible ? (
          <ProjectForm onClose={() => setIsFormVisible(false)} />
        ) : null}
        <div className="cards">
          {projects.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.images[0]}
              handleRemove={() => deleteProject(project)}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside headerTitle="Proyectos" main={<ProjectsMain />} />
      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview"></section>
      </div>
    </div>
  );
}
