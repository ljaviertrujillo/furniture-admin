import { ReactNode, createContext } from "react";
import { useDispatch } from "react-redux";
import { addProject, removeProject } from "../../redux/states/projects";
import { Project } from "../../models";

interface ProjectsContextProps {
  newProject: (project: Project) => void;
  deleteProject: (project: Project) => void;
}

export const ProjectContext = createContext<ProjectsContextProps>({
  newProject: function (project: Project): void {},
  deleteProject: function (project: Project): void {},
});

export default function ProjectsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();

  const newProject = (project: Project) => {
    dispatch(addProject(project));
  };

  const deleteProject = (project: Project) => {
    dispatch(removeProject(project.id));
  };

  return (
    <ProjectContext.Provider value={{ newProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
}
