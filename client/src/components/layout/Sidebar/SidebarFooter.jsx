import { useAuth } from "../../../hooks/useAuth";

const SidebarFooter = ({ collapsed }) => {
  const { user } = useAuth();

  return (
    <footer className="sidebar-footer">
      <button type="button" className="sidebar-user" aria-label="User profile">
        <div className="sidebar-avatar">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        {!collapsed && (
          <div className="sidebar-user-info">
            <h4 className="sidebar-user-name">{user?.name}</h4>

            <span className="sidebar-user-role">{user?.role}</span>
          </div>
        )}
      </button>
    </footer>
  );
};

export default SidebarFooter;
