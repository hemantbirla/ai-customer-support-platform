import "./EmptyState.css";

const EmptyState = ({ title, description, icon, action, className = "" }) => {
  return (
    <div className={`empty-state ${className}`}>
      {icon && <div className="empty-state__icon">{icon}</div>}

      <h2 className="empty-state__title">{title}</h2>

      {description && <p className="empty-state__description">{description}</p>}

      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
};

export default EmptyState;
