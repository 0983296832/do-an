import { useState, useEffect } from "react";
import "./App.css";
import RootRoute from "./routes/RootRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RootRoute />;
      <ToastContainer />
    </>
  );
}

export default App;
