import PropTypes from "prop-types";

import EmptyState from "../../Common/EmptyState/EmptyState";

import TimelineItem from "./TimelineItem";

import styles from "./TicketTimeline.module.css";

const TicketTimeline = ({ activities = [] }) => {
  if (!activities.length) {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.heading}>Timeline</h3>

        <EmptyState
          title="No activity yet"
          description="Ticket history will appear here."
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Timeline</h3>

      <div className={styles.timeline}>
        {activities.map((activity, index) => (
          <TimelineItem
            key={activity._id || index}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

TicketTimeline.propTypes = {
  activities: PropTypes.array,
};

export default TicketTimeline;
