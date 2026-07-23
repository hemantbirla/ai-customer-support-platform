import { useNavigate } from "react-router-dom";
import { quickActions } from "../../../data/dashboardData";
import "./QuickActions.css";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <section className="quick-actions">
      <h2 className="quick-actions__title">Quick Actions</h2>

      <div className="quick-actions__grid">
        {quickActions.map((action) => (
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
