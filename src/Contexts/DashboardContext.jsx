import {React, useState, createContext } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider= ({children}) => {
  const [showSalary, setShowSalary] = useState(false);

  return (
    <DashboardContext.Provider value={{setShowSalary, showSalary}}>
        {children}
    </DashboardContext.Provider>
  );
}