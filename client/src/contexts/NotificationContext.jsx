import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Ticket Created",
      message: "Your ticket #1001 has been created",
      type: "ticket",
      read: false,
      createdAt: "2 minutes ago",
    },
    {
      id: 2,
      title: "Agent Assigned",
      message: "Agent John assigned to ticket #1001",
      type: "assignment",
      read: false,
      createdAt: "10 minutes ago",
    },
    {
      id: 3,
      title: "New Reply",
      message: "Agent replied to your ticket",
      type: "reply",
      read: true,
      createdAt: "1 hour ago",
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const addNotification = (notification) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        read: false,
        createdAt: "Just now",
        ...notification,
      },
      ...prev,
    ]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  }

  return context;
};
