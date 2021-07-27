import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userinfo = JSON.parse(localStorage?.getItem("user")) || {
    isUserLoggedIn: false,
    username: null,
    authToken: null,
  };
  const { isUserLoggedIn } = userinfo;
  const [authToken, setAuthToken] = useState(userinfo.authToken);
  const [login, setLogin] = useState(userinfo.isUserLoggedIn);
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState(userinfo.username);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        login,
        setLogin,
        loader,
        setLoader,
        isUserLoggedIn,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
