import {React, useState, createContext } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider= ({children}) => {
  const [showSalary, setShowSalary] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);

  return (
    <DashboardContext.Provider value={{setShowSalary, showSalary, showExpenses, setShowExpenses}}>
        {children}
    </DashboardContext.Provider>
  );
}