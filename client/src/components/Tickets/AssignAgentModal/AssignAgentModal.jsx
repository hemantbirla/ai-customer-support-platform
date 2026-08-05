import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./AssignAgentModal.module.css";

const AssignAgentModal = ({
  open,
  loading = false,
  agents = [],
  currentAgent = "",
  onAssign,
  onClose,
}) => {
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {}, [agents]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAgent) return;

    onAssign(selectedAgent);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Assign Agent</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Select Agent</label>

            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              disabled={loading}
            >
              <option value="">Choose Agent</option>

              {agents.map((agent) => {
                // Support both 'name' or combined 'firstName' & 'lastName'
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

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.assign}
              disabled={
                loading || !selectedAgent || selectedAgent === currentAgent
              }
            >
              {loading ? "Assigning..." : "Assign Agent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AssignAgentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  agents: PropTypes.array,
  currentAgent: PropTypes.string,
  onAssign: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssignAgentModal;
