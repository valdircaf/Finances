import {React, useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginContextProvider= ({children}) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <LoginContext.Provider value={{setShowLogin, showLogin}}>
        {children}
    </LoginContext.Provider>
  );
}