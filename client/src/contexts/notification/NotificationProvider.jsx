// src/contexts/notification/NotificationProvider.jsx

import { useCallback, useMemo, useState } from "react";
import NotificationContext from "./NotificationContext";

const NotificationProvider = ({ children }) => {
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

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        read: false,
        createdAt: "Just now",
        ...notification,
      },
      ...prev,
    ]);
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
    }),
    [notifications, unreadCount, markAsRead, markAllAsRead, addNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
