import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Login from "../Static/Templates/Login";
import { Dashboard } from "../Static/Templates/Dashboard";
import { DashboardContextProvider } from "../Contexts/DashboardContext";
import { LoginContextProvider } from "../Contexts/LoginContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginContextProvider><Login/></LoginContextProvider>
  },
  {
    path: "/dashboard",
    element: <DashboardContextProvider><Dashboard/></DashboardContextProvider>
  }
]);