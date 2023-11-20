import { createContext, useEffect, useState } from "react";
import UseAuth from "../Hooks/UseAuth";
import urlAxios from "../config/UrlAxios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { userData, setUserData } = UseAuth();
  const [contactos, setContatos] = useState([]);
  const [contacto, setContacto] = useState({});
  const [id, setId] = useState(null);
  const [mostrar, setMostra] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mostrarChat,setMostrarChat]=useState(false)
  useEffect(() => {
    const autenticarUser = async () => {
      const token = localStorage.getItem("token-id-user");
      if (!token) {
        setLoading(false);
        return;
      }
      const confi = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { token },
      };
      try {
        const { data } = await urlAxios("/chat/perfil", confi);
        setUserData(data);
        setId(data.id);
        localStorage.setItem("id_user", data.id);
      } catch (error) {
        console.log(error);
        setUserData({});
      }
      setLoading(false);
    };
    autenticarUser();
  }, []);

  useEffect(() => {
    const solicitar_contactos = async () => {
      const id = localStorage.getItem("id_user");
      try {
        const { data } = await urlAxios(`/chat/perfil/contactos/${id}`);
        // console.log(data);
        setContatos(data);
      } catch (error) {
        console.log(error);
        setContatos([]);
      }
    };
    solicitar_contactos();
  }, []);

  const agregar_contacto = async (nombre, idContacto, id_user) => {
    console.log(nombre, idContacto);
    if (!id_user) {
      try {
        const { data } = await urlAxios.post("/chat/registrar-contacto", {
          id,
          nombre,
          idContacto,
        });
        console.log(data);
        setContatos([...contactos, data]);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await urlAxios.post("/chat/actulizar-contacto", {
          id,
          nombre,
          idContacto,
        });
        console.log(data);
        setContatos([...contactos, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const actulizar_contacto = (data) => {
    setContacto(data);
  };

  const eliminar_contacto = async (usuarioId, contactoId) => {
    try {
      await urlAxios.delete(
        `/chat/eliminar-contacto/${usuarioId}/${contactoId}`
      );
      const contactosActulizados = contactos.filter(
        (item) => item.id !== contactoId
      );
      setContatos(contactosActulizados);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          userData,
          mostrar,
          contactos,
          setMostra,
          contacto,
          setContacto,
          agregar_contacto,
          id,
          actulizar_contacto,
          eliminar_contacto,
          loading, setLoading,
          mostrarChat,setMostrarChat
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export default AppContext;

export { AppProvider };
