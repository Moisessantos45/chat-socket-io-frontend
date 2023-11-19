import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import urlAxios from "../config/UrlAxios";
import "../css/styleForm.css";
import axios from "axios";
import Swal from "sweetalert2";

const mostrarAlerta = (texto) => {
  Swal.fire({
    icon: "error",
    width: 300,
    title: texto,
    timer: 1500,
    customClass: {
      title: "mi-clase",
    },
  });
};

const apiKey = import.meta.env.VITE_URL_APIKEY;

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [url_imagen, setUrlImagen] = useState("");
  const navigate = useNavigate();

  const handelSubtmi = async (e) => {
    e.preventDefault();
    if ([password, email, nombre].includes("") && password.length>7) {
      mostrarAlerta("hay campos vacios");
      return;
    }
    const formData = new FormData();
    formData.append("image", imagen);
    // formData.append("upload_preset", "bg_perfil");
    try {
      // const res = await axios.post(
      //   `https://api.cloudinary.com/v1_1/dtkskpitc/image/upload`,
      //   formData
      // );
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      console.log(data);
      setUrlImagen(data.data.url);
      await urlAxios.post("/chat/registrarse", {
        email,
        password,
        nombre,
        url_imagen,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className=" flex m-auto justify-center items-center">
        <div className="form-box m-1">
          <form className="form" onSubmit={handelSubtmi}>
            <span className="title">Sign up</span>
            <span className="subtitle">Crea tu cuenta</span>
            <div className="form-container">
              <input
                type="text"
                className="input"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="imagen"
                className=" flex justify-center items-center w-28 gap-1 bg-indigo-500 rounded-md text-white text-xl margin"
              >
                Imagen
                <i className="fa-regular fa-image"></i>
              </label>
              <input
                type="file"
                name="imagen"
                id="imagen"
                accept="image/*"
                className="ocultar"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </div>
            <button>Crear</button>
          </form>
          <div className="form-section">
            <p>
              Ya tienes cuenta <Link to="/login">Log in</Link>{" "}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default FormRegister;
