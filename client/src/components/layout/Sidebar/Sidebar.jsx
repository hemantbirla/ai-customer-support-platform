import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare } from "lucide-react";

import { sidebarMenus } from "../../../config/sidebarMenu";
import { useAuth } from "../../../hooks/useAuth";
import { useSidebar } from "../../../hooks/useSidebar";

import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();

  const { isCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();
  const location = useLocation();

  const menuItems = useMemo(() => {
    const menus = [...(sidebarMenus[user?.role] || [])];

    const chatMatch = location.pathname.match(/^\/tickets\/([^/]+)\/chat$/);

    const ticketMatch = location.pathname.match(/^\/tickets\/([^/]+)$/);

    const ticketId = chatMatch?.[1] || ticketMatch?.[1];

    if (ticketId) {
      const exists = menus.some((menu) => menu.id === "ticket-chat");

      if (!exists) {
        menus.splice(3, 0, {
          id: "ticket-chat",
          label: "Ticket Chat",
          path: `/tickets/${ticketId}/chat`,
          icon: MessageSquare,
        });
      }
    }

    return menus;
  }, [user?.role, location.pathname]);

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
