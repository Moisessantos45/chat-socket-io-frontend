import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import bg_puntos from "../img/icon_puntos.png";
import bg_send from "../img/icon_send.svg";
import icon_add from "../img/icon_add.png";
import UseApp from "../Hooks/UseApp";
import ModalContact from "../components/ModalContact";
import urlAxios from "../config/UrlAxios";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import Chats from "../components/Chats";
const apiKey = import.meta.env.VITE_URL_APIKEY;
let socket;

const HomeUser = () => {
  let id_key = uuidv4();
  const {
    userData,
    mostrar,
    setMostra,
    contactos,
    actulizar_contacto,
    eliminar_contacto,
    mostrarChat,
    setMostrarChat,
  } = UseApp();
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [chatSeleccionado, setChatSeleccionado] = useState("");
  const [image, setImagen] = useState(null);
  const [contacto, setContacto] = useState({});
  const [contactoId, setcontactoId] = useState(null);
  const [indice, setIndice] = useState(null);
  const mensajesChat = [];
  let chat = {};
  const mensajesRef = useRef(null);
  const params = useParams();
  const { id } = params;
  // console.log(id);
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("inicio", id);
  }, []);

  useEffect(() => {
    socket.on("recibir mensaje", (message) => {
      // setMensajes(message);
      console.log("mensaje recibido", message);
      setMensajes([...mensajes, message]);
    });
  });

  // useEffect(() => {
  //   if (mensajesRef.current) {
  //     mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
  //   }
  // }, [mensajes]);

  const handerSubmit = async (e) => {
    let imagen = image;
    e.preventDefault();
    const IdEmite = userData.id;
    const IdRecibe = contacto.id;
    const id = userData.id;
    const formData = new FormData();

    try {
      if (imagen != null && imagen.size > 3 * 1024 * 1024) {
        const options = {
          maxSizeMB: 1,
          useWebWorker: true,
          maxWidthOrHeight: Infinity,
        };
        const compressedFile = await imageCompression(imagen, options);
        imagen = compressedFile;
      }
      if (imagen != null) {
        formData.append("image", imagen);
      }
      if (imagen != null) {
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        // console.log(data.data);
        imagen = data.data.url;
      }
      if (mensaje == "" && imagen == null) {
        return;
      }
      // console.log(imagen);
      const { data } = await urlAxios.post("/chat/envio-mensaje", {
        mensaje,
        IdEmite,
        IdRecibe,
        imagen,
      });
      setMensajes([...mensajes, data]);
      socket.emit("mensaje enviado", data);
      setChatSeleccionado(data);
      setMensaje("");
      setImagen(null);
    } catch (error) {
      setMensaje("");
      setImagen(null);
      console.log(error);
    }
  };

  const solicitar_mensajes = async (id_contact) => {
    try {
      const { data } = await urlAxios(
        `/chat/perfil/mensajes/${userData.id}/${id_contact}`
      );
      let mensajesFiltrados = data.filter(
        (message) =>
          (message.IdEmite === userData.id &&
            message.IdRecibe === contacto.id) ||
          (message.IdEmite === contacto.id && message.IdRecibe === userData.id)
      );

      setMensajes(mensajesFiltrados);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (contacto?.id !== null) {
      solicitar_mensajes(contacto);
    }
  }, [contacto]);

  const opciones = (dato, pos) => {
    // solicitar_mensajes(dato.id);
    setContacto(dato);
    setcontactoId(dato.id);
    setIndice(pos);
    const esMovil = window.matchMedia("(max-width: 768px)").matches;
    if (esMovil) {
      setMostrarChat(!mostrarChat);
    }
  };
  // console.log(mostrarChat);
  return (
    <>
      <main className=" w-11/12 m-auto flex justify-center flex-col items-center">
        <section className=" w-11/12 flex justify-center gap-2 m-2 flex-wrap relative">
          <div className=" heigth w-11/12 sm:w-5/12 bg-white rounded-md shadow-sm flex items-center shadow-slate-400 flex-col relative">
            <div className="m-1 width h-11 flex justify-center items-center">
              <form className=" w-full flex justify-center">
                <input
                  type="search"
                  name="Seacrh"
                  id="search"
                  className=" w-full rounded-md outline-none m-2 h-9  shadow-sm shadow-slate-400"
                  placeholder="Buscar contacto"
                />
              </form>
            </div>
            <div className=" width flex-wrap gap-1 flex scroll">
              {contactos.length > 0 &&
                contactos.map((items, i) => (
                  <div
                    key={items.id}
                    className=" w-full h-14 m-1 flex gap-1 hover:shadow-sm hover:shadow-slate-400 hover:border-l-4 hover:border-violet-950 transition-all rounded-sm cursor-pointer items-center"
                    onClick={() => {
                      opciones(items, i);
                    }}
                  >
                    <img src={items.foto} alt="" className=" rounded-md h-11" />
                    <div className=" flex flex-col">
                      <h1 className=" font-bold">{items.nombre}</h1>
                      <span>
                        {(mensajes[mensajes.length - 1]?.IdRecibe ==
                          contacto.id ||
                          mensajes[mensajes.length - 1]?.IdEmite ==
                            contacto.id) &&
                        i == indice
                          ? mensajes[mensajes.length - 1]?.mensaje || " "
                          : ""}
                      </span>
                    </div>
                    <i
                      className="fa-solid fa-minus ml-auto text-2xl cursor-pointer"
                      onClick={() => eliminar_contacto(userData.id, items.id)}
                    ></i>
                  </div>
                ))}
            </div>
            <img
              src={icon_add}
              alt=""
              className=" w-1h-12 h-12 absolute bottom-3 cursor-pointer right-2"
              onClick={() => setMostra(!mostrar)}
            />
          </div>
          <div
            className={`sm:w-6/12 flex-col w-12/12 heigth-chat sm:flex ${
              mostrarChat ? "flex transition-all" : "hidden"
            } `}
          >
            {contacto?.id ? (
              <>
                <i
                  className="fa-solid cursor-pointer fa-arrow-left m-1 text-2xl sm:hidden flex"
                  onClick={() => setMostrarChat(!mostrarChat)}
                ></i>
                <div className=" w-full sm:outline-none outline-1 relative outline outline-slate-600 flex items-center gap-1 bg-white h-12 rounded-md">
                  <img
                    src={contacto.foto}
                    alt=""
                    className=" rounded-md h-11"
                  />
                  <div className=" flex flex-col">
                    <h1 className=" font-bold">{contacto.nombre}</h1>
                    <span>
                      Disponible: {contacto.activo ? "Activo" : "Desconectado"}
                    </span>
                  </div>
                  <button
                    className="ml-auto"
                    onClick={() => {
                      actulizar_contacto(contacto);
                      setMostra(!mostrar);
                    }}
                  >
                    <img
                      src={bg_puntos}
                      alt=""
                      className="rounded-md h-7 cursor-pointer "
                    />
                  </button>
                </div>
                <Chats mensajes={mensajes} />
                {/* <div
                  className=" w-full flex flex-col scroll altura items-start"
                  ref={mensajesRef}
                  key={id_key}
                  style={{
                    background:
                      userData.fondo && userData.fondo.startsWith("#")
                        ? userData.fondo
                        : `url(${userData.fondo})`,
                  }}
                >
                  {mensajes.length > 0 &&
                    mensajes.map((message, i) => (
                      <div
                        className={`rounded-md flex flex-wrap p-1 break-all w-6/12 h-12 bg-white m-1 flex-col ml-auto" ${
                          message.IdEmite == userData.id
                            ? "ml-auto self-end bg-green-200"
                            : "mr-auto self-start"
                        } ${message.imagen ? "h-auto" : "h-12"}`}
                        key={message.id}
                      >
                        <p>{message.mensaje}</p>
                        {message.imagen ? (
                          <img
                            className=" h-auto w-11/12 m-1"
                            src={message.imagen}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                </div> */}
                <div className=" bg-white h-12 rounded-md flex justify-evenly">
                  <form
                    className="flex w-full items-center justify-evenly"
                    onSubmit={handerSubmit}
                  >
                    <textarea
                      type="text"
                      id="mensaje"
                      className="outline-none break-all rounded-sm p-1 shadow-sm bg-slate-50 shadow-slate-300 h-10 w-9/12 m-1 text-sm"
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      placeholder="mensaje"
                    />
                    <label htmlFor="imagen" className=" cursor-pointer">
                      <i className="fa-regular fa-image text-xl m-1"></i>
                    </label>
                    <input
                      type="file"
                      name="imagen"
                      id="imagen"
                      accept="image/*"
                      className="ocultar"
                      onChange={(e) => setImagen(e.target.files[0])}
                    />
                    <button
                      type="submit"
                      className="m-2 cursor-pointer bg-blue-500 w-12 h-8 rounded-md"
                    >
                      <img
                        src={bg_send}
                        className=" fill-white h-6 w-full filter invert"
                      />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <h1 className=" text-2xl text-center sm:flex hidden">
                Selecciona un chat
              </h1>
            )}
          </div>
        </section>
      </main>
      {mostrar && <ModalContact />}
    </>
  );
};

export default HomeUser;
