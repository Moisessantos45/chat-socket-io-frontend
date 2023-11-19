import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LayoutInicio = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LayoutInicio;
