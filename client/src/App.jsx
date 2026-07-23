import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";

import AppRoutes from "./routes/AppRoutes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <RouterProvider router={AppRoutes} />
      </SidebarProvider>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </AuthProvider>
  );
}

export default App;
