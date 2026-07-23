import { useContext } from "react";
import SidebarProvider from "../contexts/SidebarContext";

const useSidebar = () => {
  return useContext(SidebarProvider);
};

export default useSidebar;
