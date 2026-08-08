import Notification from "../models/Notification.js";

class NotificationService {
  async createNotification(data, io) {
    const notification = await Notification.create(data);

    io.to(`user_${data.user}`).emit("notification:new", notification);

    return notification;
  }

  async getUserNotifications(userId) {
    return Notification.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
  }

  async markRead(notificationId) {
    return Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );
  }

  async markAllRead(userId) {
    return Notification.updateMany(
      {
        user: userId,
      },
      {
        isRead: true,
      },
    );
  }

  async createNotification(data, io) {
    console.log("Creating notification:", data);

    const notification = await Notification.create(data);

    console.log("Created:", notification);

    if (io) {
      io.to(`user_${data.user}`).emit("notification:new", notification);
    }

    return notification;
  }
}

export default new NotificationService();
