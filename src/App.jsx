import { createBrowserRouter } from "react-router-dom";
import LayoutInicio from "./layout/LayoutInicio";
import Home from "./Home/Home";
import LayoutUser from "./layout/LayoutUser";
import HomeUser from "./Home/HomeUser";
import FormRegister from "./pages/FormRegister";
import FormLogin from "./pages/FormLogin";
import Perfil from "./pages/Perfil";
import Contacto from "./pages/Contacto";

const App = createBrowserRouter([
  {
    path: "/",
    element: <LayoutInicio />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <FormRegister />,
      },
      {
        path: "/login",
        element: <FormLogin />,
      },
    ],
  },
  {
    path: "/chat/:id",
    element: <LayoutUser />,
    children: [
      {
        index: true,
        element: <HomeUser />,
      },
      {
        path:"perfil",
        element:<Perfil/>
      },
      {
        path:"contacto",
        element:<Contacto/>
      }
    ],
  },
]);

export default App;
