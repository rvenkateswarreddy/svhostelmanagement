import React from "react";
import Menubar from "./components/Menubar";
import { Outlet } from "react-router-dom";

const Sharecomp = () => {
  return (
    <div>
      <Menubar />
      <Outlet />
    </div>
  );
};

export default Sharecomp;
