import PropTypes from "prop-types";
import { format } from "date-fns";

import {
  CheckCircle2,
  Clock3,
  MessageSquare,
  Paperclip,
  UserPlus,
  Flag,
  RefreshCcw,
} from "lucide-react";

import styles from "./TimelineItem.module.css";

const getActionIcon = (action) => {
  switch (action) {
    case "CREATED":
      return <CheckCircle2 size={18} />;

    case "STATUS_CHANGED":
      return <RefreshCcw size={18} />;

    case "PRIORITY_CHANGED":
      return <Flag size={18} />;

    case "ASSIGNED":
      return <UserPlus size={18} />;

    case "COMMENT_ADDED":
      return <MessageSquare size={18} />;

    case "ATTACHMENT_ADDED":
      return <Paperclip size={18} />;

    case "UPDATED":
      return <Clock3 size={18} />;

    case "CLOSED":
      return <CheckCircle2 size={18} />;

    case "REOPENED":
      return <RefreshCcw size={18} />;

    default:
      return <Clock3 size={18} />;
  }
};

const getActionClass = (action) => {
  switch (action) {
    case "CREATED":
      return styles.created;

    case "STATUS_CHANGED":
      return styles.status;

    case "PRIORITY_CHANGED":
      return styles.priority;

    case "ASSIGNED":
      return styles.assigned;

    case "COMMENT_ADDED":
      return styles.comment;

    case "ATTACHMENT_ADDED":
      return styles.attachment;

    case "UPDATED":
      return styles.updated;

    case "CLOSED":
      return styles.closed;

    case "REOPENED":
      return styles.reopened;

    default:
      return styles.default;
  }
};

const TimelineItem = ({ activity, isLast }) => {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={`${styles.circle} ${getActionClass(activity.action)}`}>
          {getActionIcon(activity.action)}
        </div>

        {!isLast && <div className={styles.line} />}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span
            className={`${styles.badge} ${getActionClass(activity.action)}`}
          >
            {activity.action.replaceAll("_", " ")}
          </span>

          <span className={styles.time}>
            {format(new Date(activity.createdAt), "dd MMM yyyy • hh:mm a")}
          </span>
        </div>

        <h4 className={styles.title}>{activity.description}</h4>

        <p className={styles.user}>
          By <strong>{activity.performedBy?.name || "System"}</strong>
        </p>
      </div>
    </div>
  );
};

TimelineItem.propTypes = {
  activity: PropTypes.object.isRequired,
  isLast: PropTypes.bool,
};

export default TimelineItem;
