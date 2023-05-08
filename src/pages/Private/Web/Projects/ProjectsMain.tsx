import { useContext } from "react";
import { Card, ComplementaryButton, ProjectForm } from "../../../../components";
import { WebContext } from "../../../../context/Web/WebContext";
import { VscAdd, VscClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { ProjectContext } from "../../../../context/Web/ProjectsContext";

export default function ProjectsMain() {
  const { isFormVisible, setIsFormVisible } = useContext(WebContext);
  const { deleteProject } = useContext(ProjectContext);
  const projects = useSelector((state: AppStore) => state.project.data);

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
}
