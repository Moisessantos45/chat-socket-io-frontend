import { useContext } from "react";
import AppContextAuth from "../context/AppAuth";

const UseAuth = () => {
  return useContext(AppContextAuth)
}
export default UseAuth
