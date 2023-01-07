import React, { createContext, useState } from "react";

export const Context = createContext();

// ModalFields: {foldername, filename, language, type, isopenmodel}
function ModalProvider({ children }) {
  //DATA
  const [time, setTime] = useState();

  const AllData = {
    //All Data fields
    time: time,
    setTime: setTime,
  };

  return <Context.Provider value={AllData}>{children}</Context.Provider>;
}
