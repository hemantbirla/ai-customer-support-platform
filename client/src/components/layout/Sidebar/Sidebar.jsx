import { useEffect, useMemo } from "react";
import { sidebarMenus } from "../../../config/sidebarMenu";
import { useAuth } from "../../../contexts/AuthContext";
import { useSidebar } from "../../../hooks/useSidebar";

import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();

  const { isCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();

  const menuItems = useMemo(() => {
    return sidebarMenus[user?.role] || [];
  }, [user?.role]);

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMobileSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMobileSidebar]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar
          ${isCollapsed ? "collapsed" : ""}
          ${isMobileOpen ? "mobile-open" : ""}`}
        aria-label="Sidebar Navigation"
      >
        <SidebarHeader collapsed={isCollapsed} />

        <nav className="sidebar-nav" aria-label="Primary Navigation">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} item={item} collapsed={isCollapsed} />
          ))}
        </nav>

        <SidebarFooter collapsed={isCollapsed} />
      </aside>
    </>
  );
};

export default Sidebar;
