import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";

import AppRoutes from "./routes/AppRoutes";

import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SidebarProvider>
          <NotificationProvider>
            <RouterProvider router={AppRoutes} />
          </NotificationProvider>
        </SidebarProvider>
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </AuthProvider>
  );
}

export default App;
