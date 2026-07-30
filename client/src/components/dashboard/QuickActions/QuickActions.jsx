import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { quickActions } from "../../../data/dashboardData";
import "./QuickActions.css";

const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userRole = user?.role?.toUpperCase();

  // Filter actions if needed, or filter out "Create Ticket" for agents
  const filteredActions = quickActions.filter((action) => {
    // If the action path goes to create a ticket, hide it for agents
    if (action.path?.includes("new") && userRole === "AGENT") {
      return false;
    }
    return true;
  });

  return (
    <section className="quick-actions">
      <h2 className="quick-actions__title">Quick Actions</h2>

      <div className="quick-actions__grid">
        {filteredActions.map((action) => (
          <button
            key={action.id}
            className="quick-action-card"
            onClick={() => navigate(action.path)}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
