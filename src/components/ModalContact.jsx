import { useEffect, useState } from "react";
import UseApp from "../Hooks/UseApp";

const ModalContact = () => {
  const { contacto, mostrar, setMostra, agregar_contacto } = UseApp();
  const [nombre, setNombre] = useState("");
  const [idContacto, setIdContacto] = useState("");
  const [id, setId] = useState(null);
  const handerlSubtmit = (e) => {
    e.preventDefault();
    agregar_contacto(nombre, idContacto, id);
  };
  useEffect(() => {
    if (contacto?.id) {
      setNombre(contacto.nombre);
      setIdContacto(contacto.id);
      setId(contacto.id);
    }
  }, [contacto]);

  const handelClick = () => {
    setMostra(!mostrar);
    setNombre("");
    setIdContacto("");
    setId(null);
  };
  return (
    <main
      className={`w-full modal justify-center items-center ${
        mostrar ? "flex" : "mostrar"
      }  `}
    >
      <form
        className=" shadow-sm relative shadow-slate-400 flex justify-evenly rounded-md bg-white h-14 w-11/12 sm:w-5/12 items-center"
        onSubmit={handerlSubtmit}
      >
        <i
          className=" fa-solid fa-circle-xmark absolute right-0 top-0 translate-x-6 sm:translate-x-7 text-2xl cursor-pointer"
          onClick={handelClick}
        ></i>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className=" rounded-sm w-28 h-8 m-1 shadow-sm shadow-slate-400 outline outline-1 outline-slate-400"
          placeholder="El nombre"
        />
        <input
          type="text"
          value={idContacto}
          onChange={(e) => setIdContacto(e.target.value)}
          className=" w-52 rounded-sm h-8 m-1 shadow-sm shadow-slate-400 outline outline-1 outline-slate-400"
          placeholder="agrega el id"
        />
        <button
          type="submit"
          className={`rounded-md h-7 bg-indigo-600 text-xl text-white m-1 ${
            id ? "w-24" : "w-16"
          }`}
        >
          {id ? "Actulizar" : "Add"}
        </button>
      </form>
    </main>
  );
};

export default ModalContact;
