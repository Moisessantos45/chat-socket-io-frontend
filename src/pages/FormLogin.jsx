import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import urlAxios from "../config/UrlAxios";
import "../css/styleForm.css";
import UseAuth from "../Hooks/UseAuth";
import Loading from "../components/Loading";
import UseApp from "../Hooks/UseApp";
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

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loading, setLoading } = UseApp();
  const { setUserData } = UseAuth();

  const handelSubtmi = async (e) => {
    e.preventDefault();
    try {
      const { data } = await urlAxios.post("/chat/login", {
        email,
        password,
      });
      console.log(data);
      setUserData(data);
      localStorage.setItem("token-id-user", data.token);
      navigate(`/chat/${data.id}`);
    } catch (error) {
      console.log(error);
      mostrarAlerta(error.response.data.msg);
    }
    setLoading(false);
  };
  // if (loading) return <Loading />;
  return (
    <>
      <main className=" flex m-auto heigth justify-center items-center">
        <div className="form-box">
          <form className="form" onSubmit={handelSubtmi}>
            <span className="title">Sign up</span>
            <span className="subtitle">Inicia un sesion</span>
            <div className="form-container">
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
            </div>
            <button type="submit">Sign up</button>
          </form>
          <div className="form-section">
            <p>
              Aun no tienes cuenta? <Link to="/register">Crear cuenta</Link>{" "}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default FormLogin;
