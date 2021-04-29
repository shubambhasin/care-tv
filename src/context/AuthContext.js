import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    name: "test",
    password: "test",
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        user,
        username,
        setUsername,
        password,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
