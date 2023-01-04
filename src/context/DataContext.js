import React, { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

const Context = createContext({
  projects: [],
});

export const Provider = (props) => {
  const { children } = props;
  const [projects, setProjects] = useLocalStorage("data", []);

  const addProject = (details) => {
    const newProject = {
      id: uuidv4(),
      files_id: uuidv4(),
      files: [],
      ...details,
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id) => {
    const newProjects = projects.filter((t) => t.id !== id);
    setProjects(newProjects);
  };

  const renameProject = ({ id, newName }) => {
    const newProjects = projects.map((project) => {
      if (project.id === id) return { ...project, name: newName };
      else return { ...project };
    });

    setProjects(newProjects);
  };

  const addFile = ({ id, name, language, lang_id }) => {
    //Project Search
    const projectIndex = projects.findIndex((p) => p.id === id);
    const previousFiles = projects[projectIndex].files;

    //New File Creation
    const newFile = {
      id: uuidv4(),
      name,
      language,
      content: "",
      lang_id,
    };

    const newProjects = projects.map((project) => {
      if (project.id === id)
        return { ...project, files: [...previousFiles, newFile] };
      else return { ...project };
    });

    setProjects(newProjects);
  };

  const removeFile = ({ pid, fid }) => {
    const newProjects = projects.map((project) => {
      if (project.id === pid)
        return {
          ...project,
          files: project.files.filter((file) => file.id !== fid),
        };
      else return project;
    });

    setProjects(newProjects);
  };

  const updateCode = ({ pid, fid, code }) => {
    let p_index = projects?.findIndex((ex) => ex.id === pid);
    let f_index = projects[p_index]?.files.findIndex((x) => x.id === fid);

    setProjects((oldProjects) => {
      const newProjects = [...oldProjects];

      console.log("BACKEND", pid);
      newProjects[p_index].files[f_index].content = code;

      return newProjects;
    });
  };

  const renameFile = ({ id, name, language }) => {};

  return (
    <Context.Provider
      value={{
        projects,
        addProject,
        removeProject,
        renameProject,
        addFile,
        removeFile,
        updateCode,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useProjects = () => useContext(Context);

export const withProvider = (Component) => {
  return (props) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
};
