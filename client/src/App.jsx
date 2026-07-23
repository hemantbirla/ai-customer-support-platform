import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeContext";
import SidebarProvider from "./contexts/SidebarContext";
import NotificationProvider from "./contexts/NotificationContext";

import router from "./routes/AppRoutes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SidebarProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </SidebarProvider>
      </ThemeProvider>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </AuthProvider>
  );
}

export default App;
