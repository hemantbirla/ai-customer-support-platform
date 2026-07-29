import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  CheckCircle2,
  RefreshCcw,
  Flag,
  UserPlus,
  MessageSquare,
  Paperclip,
  Edit3,
  XCircle,
} from "lucide-react";

import styles from "./ActivityLogItem.module.css";

const ICONS = {
  CREATED: <CheckCircle2 size={18} />,
  UPDATED: <Edit3 size={18} />,
  STATUS_CHANGED: <RefreshCcw size={18} />,
  PRIORITY_CHANGED: <Flag size={18} />,
  ASSIGNED: <UserPlus size={18} />,
  COMMENT_ADDED: <MessageSquare size={18} />,
  ATTACHMENT_ADDED: <Paperclip size={18} />,
  CLOSED: <XCircle size={18} />,
  REOPENED: <RefreshCcw size={18} />,
};

const ActivityLogItem = ({ log }) => {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        {ICONS[log.action] || <Edit3 size={18} />}
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.action}>
            {log.action.replaceAll("_", " ")}
          </span>

          <span className={styles.time}>
            {format(new Date(log.createdAt), "dd MMM yyyy • hh:mm a")}
          </span>
        </div>

        <p className={styles.description}>{log.description}</p>

        <p className={styles.user}>
          By <strong>{log.performedBy?.name || "System"}</strong>
        </p>
      </div>
    </div>
  );
};

ActivityLogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default ActivityLogItem;
