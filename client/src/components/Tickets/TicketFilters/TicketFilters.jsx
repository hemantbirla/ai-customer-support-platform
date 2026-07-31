import PropTypes from "prop-types";

import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
  STATUS_LABELS,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
} from "../../../constants/ticket.constants";

import styles from "./TicketFilters.module.css";

const TicketFilters = ({ filters, onFilterChange, agents = [] }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className={styles.filters}>
      {/* Status */}
      <div className={styles.group}>
        <label htmlFor="status">Status</label>

        <select
          id="status"
          name="status"
          value={filters.status || ""}
          onChange={handleChange}
        >
          <option value="">All Status</option>

          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div className={styles.group}>
        <label htmlFor="priority">Priority</label>

        <select
          id="priority"
          name="priority"
          value={filters.priority || ""}
          onChange={handleChange}
        >
          <option value="">All Priorities</option>

          {PRIORITY_OPTIONS.map((priority) => (
            <option key={priority} value={priority}>
              {PRIORITY_LABELS[priority]}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className={styles.group}>
        <label htmlFor="category">Category</label>

        <select
          id="category"
          name="category"
          value={filters.category || ""}
          onChange={handleChange}
        >
          <option value="">All Categories</option>

          {CATEGORY_OPTIONS.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
      </div>

      {/* Assigned Agent */}
      <div className={styles.group}>
        <label htmlFor="assignedAgent">Assigned Agent</label>

        <select
          id="assignedAgent"
          name="assignedAgent"
          value={filters.assignedAgent || ""}
          onChange={handleChange}
        >
          <option value="">All Agents</option>

          {agents.map((agent) => {
            const agentName =
              agent.name ||
              `${agent.firstName || ""} ${agent.lastName || ""}`.trim() ||
              agent.email;

            return (
              <option key={agent._id} value={agent._id}>
                {agentName}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

TicketFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  agents: PropTypes.array,
};

export default TicketFilters;
