import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"
import { useDispatch } from "react-redux"
import { addProject, removeProject } from "../../redux/states/projects";
import { IProject } from "../../models";

interface ProjectsContextProps {
    newProject: (project: IProject) => void;
    deleteProject: (project: IProject) => void;
}

export const ProjectContext = createContext<ProjectsContextProps>({
    newProject: function (project: IProject): void {},
    deleteProject: function (project: IProject): void {},
})

export default function ProjectsContextProvider({children}: {children: ReactNode}) {
    const dispatch = useDispatch();

    const newProject = (project: IProject) => {
        dispatch( addProject(project) )
    }

    const deleteProject = (project: IProject) => {
        dispatch(removeProject(project.id))
    }

  return (
    <ProjectContext.Provider value={{ newProject, deleteProject }}>
        {children}
    </ProjectContext.Provider>
  )
}
