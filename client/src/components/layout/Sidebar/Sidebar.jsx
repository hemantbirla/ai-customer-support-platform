import { useSidebar } from "../../hooks/useSidebar";

function Sidebar() {
  const { isCollapsed } = useSidebar();

  return (
    <aside className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
      Sidebar
    </aside>
  );
}

export default Sidebar;
