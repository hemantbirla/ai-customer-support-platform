import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../../hooks/useSidebar";

const SidebarItem = ({ item, collapsed }) => {
  const Icon = item.icon;

  const { closeMobileSidebar } = useSidebar();

  return (
    <NavLink
      to={item.path}
      end
      onClick={closeMobileSidebar}
      className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
      aria-label={item.label}
    >
      <Icon size={20} className="sidebar-item-icon" />

      {!collapsed && <span className="sidebar-item-label">{item.label}</span>}
    </NavLink>
  );
};

export default memo(SidebarItem);
