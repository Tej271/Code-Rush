import "./App.css";
import React from "react";
import PlayGround from "./Pages/PlayGround";
import HomePage from "./Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModalProvider from "./context/ModalContext";
import { Provider as DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/PlayGround" element={<PlayGround />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </DataProvider>
  );
}

export default App;
