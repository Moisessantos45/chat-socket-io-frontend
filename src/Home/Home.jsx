import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import bg from "../img/chat_bot.jpg";

const Home = () => {
  return (
    <>
      <main
        className=" w-full flex justify-center items-center flex-col heigth-home"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className=" w-full text-center text-2xl text-white font-bold">Conversa con tus conocidos</h1>
        <Link
          to="register"
          className="bg-blue-600 text-white h-9 text-xl w-36 rounded-md flex justify-center items-center m-2"
        >
          Registrate
        </Link>
        <Link
          to="login"
          className="bg-blue-600 text-white h-9 text-xl w-36 rounded-md flex justify-center items-center m-2"
        >
          Inicia sesion
        </Link>
      </main>
    </>
  );
};

export default Home;
