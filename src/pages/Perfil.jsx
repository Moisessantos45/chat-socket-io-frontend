import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import urlAxios from "../config/UrlAxios";
import axios from "axios";
import UseApp from "../Hooks/UseApp";

const apiKey = import.meta.env.VITE_URL_APIKEY;

const Perfil = () => {
  const { userData } = UseApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [url_imagen, setUrlImagen] = useState("");
  const [fondo, setFondo] = useState(null);
  const [id,setId]=useState(null)

  useEffect(() => {
    if (userData?.id) {
      setEmail(userData.email);
      setNombre(userData.nombre);
      setUrlImagen(userData.url_imagen);
      setFondo(userData.fondo)
      setId(userData.id)
    }
  }, []);

  const handelSubtmi = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const filesToUpload = [];

    if (imagen && imagen instanceof File) {
      filesToUpload.push({ key: "image", value: imagen });
    }

    if (fondo && fondo instanceof File) {
      filesToUpload.push({ key: "background", value: fondo });
    }

    filesToUpload.forEach(({ key, value }) => {
      formData.append(key, value);
    });

    try {
      if (filesToUpload.length > 0) {
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        console.log(data);
        filesToUpload.forEach(({ key, value }) => {
          if (key === "image") {
            setUrlImagen(data.data.url);
          } else if (key === "background") {
            setFondo(data.data.url);
          }
        });
      }
      await urlAxios.put("/chat/actulizar-usuario", {
        id,
        email,
        password,
        nombre,
        url_imagen,
        fondo
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className=" w-10/12 bg-white heigth margin rounded-md">
      <div className="width flex m-2 gap-1">
        <Link to={`/chat/${userData.id}`} className=" m-2">
          <i className="fa-solid fa-arrow-left m-1 text-2xl"></i>
          Chat
        </Link>
      </div>
      <form
        className=" w-11/12 flex justify-center flex-wrap"
        onSubmit={handelSubtmi}
      >
        <div className="width margin flex items-center justify-evenly">
          <div className=" w-3/12 flex flex-col">
            <img
              src={url_imagen}
              alt=""
              className=" rounded-full w-20 h-20 shadow-sm shadow-slate-400"
            />
            <h2>Foto perfil: {nombre}</h2>
          </div>
          <div className=" w-3/12 flex flex-col">
            <img
              src={fondo}
              alt=""
              className=" rounded-full w-20 h-20 shadow-sm shadow-slate-400"
            />
            <h2>Fondo chat</h2>
          </div>
          <label
            htmlFor="imagen"
            className=" flex justify-center items-center w-32 h-12 gap-1 outline outline-1 outline-slate-500 rounded-md text-black text-xl cursor-pointer"
          >
            Imagen
            <i className="fa-regular fa-image"></i>
          </label>
          <input
            type="file"
            name="imagen"
            id="imagen"
            className="ocultar"
            onChange={(e) => setImagen(e.target.files[0])}
          />
          <label
            htmlFor="fondo"
            className=" flex justify-center items-center w-32 h-12 gap-1 outline outline-1 outline-slate-500 rounded-md text-black text-xl cursor-pointer"
          >
            Fondo
            <i className="fa-regular fa-image"></i>
          </label>
          <input
            type="file"
            name="fondo"
            id="fondo"
            className="ocultar"
            onChange={(e) => setFondo(e.target.files[0])}
          />
          <input
            type="color"
            name="color"
            id="fondo"
            className="w-11 h-11 rounded-sm border-none outline-none"
            // value={fondo}
            onChange={(e) => setFondo(e.target.value)}
          />
        </div>
        <div className="width margin flex gap-1 flex-col justify-center">
          <label htmlFor="email" className=" m-1 font-bold">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="outline outline-1 outline-slate-300 hover:outline-blue-700 hover:outline-2 rounded-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className=" m-1 font-bold">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="outline outline-1 outline-slate-300 hover:outline-blue-700 hover:outline-2 rounded-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="nombre" className=" m-1 font-bold">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="outline outline-1 outline-slate-300 hover:outline-blue-700 hover:outline-2 rounded-sm"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className=" w-36 rounded-md text-white h-8 m-2 bg-blue-600"
        >
          Guardar cambios
        </button>
      </form>
    </main>
  );
};

export default Perfil;
