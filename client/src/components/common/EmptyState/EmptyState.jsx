import React from "react";
import PropTypes from "prop-types";

import "./EmptyState.css";

const EmptyState = ({
  title,
  description,
  message,
  icon,
  action,
  className = "",
}) => {
  return (
    <div className={`empty-state ${className}`}>
      {icon && <div className="empty-state__icon">{icon}</div>}

      <h2 className="empty-state__title">
        {title || message || "No Data Found"}
      </h2>

      {(description || message) && (
        <p className="empty-state__description">
          {description || (message !== title ? message : "")}
        </p>
      )}

      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.node,
  action: PropTypes.node,
  className: PropTypes.string,
};

EmptyState.defaultProps = {
  title: "",
  description: "",
  message: "",
  icon: null,
  action: null,
  className: "",
};

export default React.memo(EmptyState);
