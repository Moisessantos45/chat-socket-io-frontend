import { useEffect, useRef, useState } from "react";
import UseApp from "../Hooks/UseApp";
import { v4 as uuidv4 } from "uuid";

const Chats = ({ mensajes }) => {
  // console.log(mensajes);
  let id_key = uuidv4();
  const mensajesRef = useRef(null);
  const { userData } = UseApp();
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);
  return (
    <div
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
            key={i}
          >
            <p>{message.mensaje}</p>
            {message.imagen ? (
              <img className=" h-auto w-11/12 m-1" src={message.imagen} />
            ) : (
              ""
            )}
          </div>
        ))}
    </div>
  );
};

export default Chats;
