import PropTypes from "prop-types";

import EmptyState from "../../Common/EmptyState/EmptyState";

import ActivityLogItem from "./ActivityLogItem";

import styles from "./ActivityLog.module.css";

const ActivityLog = ({ logs = [] }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Activity Log</h3>

      {!logs.length ? (
        <EmptyState
          title="No activity available"
          description="Audit history will appear here."
        />
      ) : (
        logs.map((log, index) => (
          <ActivityLogItem key={log._id || index} log={log} />
        ))
      )}
    </div>
  );
};

ActivityLog.propTypes = {
  logs: PropTypes.array,
};

export default ActivityLog;
