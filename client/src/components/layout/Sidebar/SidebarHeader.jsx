import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSidebar } from "../../../hooks/useSidebar";

const SidebarHeader = ({ collapsed }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="sidebar-header">
      <div className="sidebar-brand">
        <div className="sidebar-logo">🤖</div>

        {!collapsed && <span className="sidebar-title">AI Support</span>}
      </div>

      <button
        type="button"
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </div>
  );
};

export default SidebarHeader;
