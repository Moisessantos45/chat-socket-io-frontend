import { createContext, useState } from "react";

const AppContextAuth = createContext();

const AppAuthProvide = ({ children }) => {
  const [userData, setUserData] = useState(null);
  return (
    <>
      <AppContextAuth.Provider value={{ userData, setUserData }}>
        {children}
      </AppContextAuth.Provider>
    </>
  );
};

export default AppContextAuth;

export { AppAuthProvide };
