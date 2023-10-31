import {React, useState, createContext } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider= ({children}) => {
  const [showSalary, setShowSalary] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showOtherCosts, setShowOtherCosts] = useState(false);
  const [expensesTotalValue, setExpensesTotalValue] = useState(0);
  const [costTotalValue, setCostTotalValue] = useState(0);


  return (
    <DashboardContext.Provider value={{setShowSalary, showSalary, showExpenses, setShowExpenses
    , showOtherCosts, setShowOtherCosts, expensesTotalValue, setExpensesTotalValue, costTotalValue, setCostTotalValue}}>
        {children}
    </DashboardContext.Provider>
  );
}