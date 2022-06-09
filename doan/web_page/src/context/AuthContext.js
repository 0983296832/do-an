import { createContext, useState } from "react";
import { LOCAL_STORAGE_USER_KEY } from "../constant/constant";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const localStorageItem = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return localStorageItem ? JSON.parse(localStorageItem) : {};
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
