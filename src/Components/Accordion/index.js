import React, { useState } from "react";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoFolderOutline,
  IoDocumentOutline,
  IoTrashOutline,
} from "react-icons/io5";
import Menu from "../Menu";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../context/DataContext";

function Accordion() {
  const { projects, removeFile } = useProjects();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(null);
  const revealAnswer = (index) => {
    if (index === isClicked) {
      return setIsClicked(null);
    }
    setIsClicked(index);
  };

  const toggleBtn = (index) => {
    if (index === isClicked) {
      return <IoChevronDownOutline className="w-[28px] h-[28px] m-4" />;
    } else {
      return <IoChevronForwardOutline className="w-[28px] h-[28px] m-4" />;
    }
  };

  const accordionClosed =
    "hidden rounded-2xl overflow-y-hidden max-w-6xl leading-snug opacity-0";
  const accordionOpen =
    "block max-h-[400px] overflow-y-visible opacity-100 mr-auto ml-10";

  return (
    <div className="grid sm:grid-cols-2 mx-10 grid-cols-1">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div
            key={project.id}
            className="flex flex-row items-center justify-between w-100"
          >
            <div
              key={index}
              id="trivia"
              onClick={() => revealAnswer(index)}
              className="flex flex-col w-[100%] sm:mx-5 sm:px-2 my-5 shadow-lg gap-x-5 dark:shadow-none dark:border dark:border-slate-400 rounded-lg"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center cursor-pointer">
                  <div className="mt-[-4]">
                    <span>{toggleBtn(index)}</span>
                  </div>
                  <h3 className="flex flex-row">
                    <IoFolderOutline className="w-[42px] h-[42px] " />
                    <button
                      className="font-medium text-accordion-question leading-relaxed font-nunito w-full text-left ml-4"
                      id={project.project_id}
                      // aria-label={screenReaderInstructions(trivia, index)}
                      aria-expanded={isClicked === index ? "true" : false}
                      aria-controls={project.files_id}
                      onClick={() => revealAnswer(index)}
                    >
                      {project.name}
                    </button>
                  </h3>
                </div>
                <div>
                  <Menu pid={project.id} />
                </div>
              </div>

              {project.files?.length > 0 ? (
                <div className="text-left">
                  <section
                    id={project.files_id}
                    aria-labelledby={project.project_id}
                    className={
                      isClicked === index ? accordionOpen : accordionClosed
                    }
                  >
                    {project.files.map((file, index) => (
                      <div
                        key={file.id}
                        className="flex flex-row justify-between"
                      >
                        <h3 className="flex flex-row m-3 text-left">
                          <IoDocumentOutline className="w-[24px] h-[24px] " />
                          <p
                            className="ml-2 hover:text-blue-600 cursor-pointer"
                            onClick={() => {
                              navigate("/PlayGround", {
                                state: { ...file, pid: project.id },
                              });
                            }}
                          >
                            {file.name}
                          </p>
                        </h3>
                        <div className="flex flex-row m-3">
                          <IoTrashOutline
                            className="w-[24px] h-[24px] ml-4 hover:text-red-500"
                            onClick={() => {
                              removeFile({ pid: project.id, fid: file.id });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </section>
                </div>
              ) : (
                <section
                  id={project.files_id}
                  aria-labelledby={project.project_id}
                  className={
                    isClicked === index ? accordionOpen : accordionClosed
                  }
                >
                  <p className="font-normal text-accordion-answer m-3">
                    No Files Added
                  </p>
                </section>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="font-normal text-accordion-answer m-3 text-gray-500">
          - Start By Creating a New Project
        </p>
      )}
    </div>
  );
}

export default Accordion;
