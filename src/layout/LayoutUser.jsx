import { Navigate, Outlet } from "react-router-dom";
import NavbarChat from "../components/NavbarChat";
import UseApp from "../Hooks/UseApp";
import Loading from "../components/Loading";

const LayoutUser = () => {
  const { loading, userData } = UseApp();
  if (loading) return <Loading />;
  return (
    <>
      {userData?.id ? (
        <>
          <NavbarChat />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default LayoutUser;
