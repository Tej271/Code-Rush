import React, { createContext, useState } from "react";

export const ModalContext = createContext();

// ModalFields: {foldername, filename, language, type, isopenmodel}
function ModalProvider({ children }) {
  const initialModalProps = {
    show: false,
    title: "",
    label: "",
    value: "",
    project_id: "",
    button_value: "",
    additionalField: 0,
  };

  const [modalProps, setModalProps] = useState({
    ...initialModalProps,
  });

  const openModal = (data) => {
    setModalProps({ ...data });
  };

  const closeModal = () => {
    setModalProps({
      ...modalProps,
      show: false,
      value: "",
      additionalField: 0,
    });
  };

  const ModalFeatures = {
    modalProps: modalProps,
    openModal: openModal,
    closeModal: closeModal,
  };

  return (
    <ModalContext.Provider value={ModalFeatures}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
