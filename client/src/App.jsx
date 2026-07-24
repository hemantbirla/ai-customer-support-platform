import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./contexts/auth";
import { SidebarProvider } from "./contexts/sidebar";
import { ThemeProvider } from "./contexts/theme";
import { NotificationProvider } from "./contexts/notification";

import AppRoutes from "./routes/AppRoutes";

import "react-toastify/dist/ReactToastify.css";

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
