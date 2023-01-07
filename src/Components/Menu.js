import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useModal } from "../context/ModalContext";
import { useProjects } from "../context/DataContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuDialog({ pid }) {
  const { removeProject } = useProjects();
  const { openModal } = useModal();

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className=" w-full justify-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
          <IoEllipsisVerticalSharp className="w-[24px] h-[24px] mt-2" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-[-10] ml-5 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item
              onClick={() => {
                openModal({
                  show: true,
                  title: "Create New File",
                  label: "Name",
                  value: "",
                  button_value: "Create",
                  project_id: pid,
                  additionalField: 1,
                });
              }}
            >
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  Create New File
                </div>
              )}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                openModal({
                  show: true,
                  title: "Rename Project",
                  label: "New Name",
                  value: "",
                  button_value: "Rename",
                  project_id: pid,
                });
              }}
            >
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  Rename Project
                </div>
              )}
            </Menu.Item>
            <Menu.Item onClick={() => removeProject(pid)}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  Delete Project
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
