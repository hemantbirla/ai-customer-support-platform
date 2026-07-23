import { useNotifications } from "../../contexts/NotificationContext";
import "./Notification.css";

const NotificationDropdown = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h4>Notifications</h4>

        <button onClick={markAllAsRead}>Mark all read</button>
      </div>

      {notifications.map((notification) => (
        <div
          key={notification.id}
          onClick={() => markAsRead(notification.id)}
          className={
            notification.read ? "notification-item" : "notification-item unread"
          }
        >
          <h5>{notification.title}</h5>

          <p>{notification.message}</p>

          <span>{notification.createdAt}</span>
        </div>
      ))}
    </div>
  );
};

export default NotificationDropdown;
