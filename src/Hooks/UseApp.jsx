import { useContext } from "react";
import AppContext from "../context/AppProvider";

const UseApp = () => {
  return useContext(AppContext);
};

export default UseApp;
