import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Login from "../Static/Templates/Login";
import { Dashboard } from "../Static/Templates/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  }
]);