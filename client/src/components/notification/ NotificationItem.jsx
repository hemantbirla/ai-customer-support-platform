import React, { memo } from "react";

const NotificationItem = ({ notification, markAsRead }) => {
  return (
    <div
      className={
        notification.read ? "notification-item" : "notification-item unread"
      }
      onClick={() => markAsRead(notification.id)}
    >
      <h5>{notification.title}</h5>

      <p>{notification.message}</p>

      <span>{notification.createdAt}</span>
    </div>
  );
};

export default memo(NotificationItem);
