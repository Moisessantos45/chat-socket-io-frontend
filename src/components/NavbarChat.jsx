import { Link, useNavigate } from "react-router-dom";
import urlAxios from "../config/UrlAxios";
import UseApp from "../Hooks/UseApp";

const NavbarChat = () => {
  const { id } = UseApp();
  const navigate=useNavigate()
  const logout = async () => {
    try {
      await urlAxios.post("/chat/logout", { id });
      localStorage.removeItem("token-id-user");
      localStorage.removeItem("id_user");
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="flex justify-center items-center flex-wrap bg-indigo-500 h-20 sm:h-12">
        <h1 className=" text-white font-bold text-xl text-center w-full sm:w-9/12">
          Administra tus conversaciones
        </h1>
        <Link
          to="perfil"
          className=" w-16 h-8 sm:ml-auto m-1 profile rounded-md text-white font-bold"
        >
          Perfil
        </Link>
        <button
          className=" w-20 h-8 m-1 profile rounded-md text-white font-bold"
          onClick={logout}
        >
          Logout
        </button>
      </header>
    </>
  );
};

export default NavbarChat;
