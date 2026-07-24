import React, { memo } from "react";

import { useNotifications } from "../../contexts/NotificationContext";
import NotificationItem from "./ NotificationItem";

import "./Notification.css";

const NotificationDropdown = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h4>Notifications</h4>

        <button type="button" onClick={markAllAsRead}>
          Mark all read
        </button>
      </div>

      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          markAsRead={markAsRead}
        />
      ))}
    </div>
  );
};

export default memo(NotificationDropdown);
