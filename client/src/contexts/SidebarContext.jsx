import { createContext } from "react";

export const SidebarContext = createContext(null);

const SidebarProvider = ({ children }) => {
  return (
    <SidebarContext.Provider value={{}}>{children}</SidebarContext.Provider>
  );
};

export default SidebarProvider;
