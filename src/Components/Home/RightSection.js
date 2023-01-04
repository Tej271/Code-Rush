import React, { useContext } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "../Modal";
import Accordion from "../Accordion";
import { ModalContext } from "../../context/ModalContext";

const RightSection = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <>
      <div className="">
        <div className="w-[full] flex flex-row justify-between">
          {/* <h4 className="text-2xl font-semibold p-5 ">User Projects</h4> */}
        </div>
        {/* <hr className="my-3 w-[95%] mx-auto h-px bg-gray-200 border-0 dark:bg-gray-700" /> */}
        <div className="flex flex-row items-center">
          <button
            className="flex flex-row justify-between items-center m-6 p-3 border shadow-lg rounded-md drop-shadow-lg justify-self-center text-center mt-5"
            onClick={() => {
              openModal({
                show: true,
                title: "Create New Project",
                label: "Name",
                value: "",
                button_value: "Create",
              });
            }}
          >
            <IoAddCircleOutline className="w-[24px] h-[24px] mr-2 text-green-600" />
            Create New Project
          </button>
        </div>

        <Accordion />
      </div>
      <Modal />
    </>
  );
};

export default RightSection;
