import notificationService from "../services/notification.service.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUserNotifications(
      req.user.id,
    );

    res.json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const markRead = async (req, res) => {
  try {
    const notification = await notificationService.markRead(req.params.id);

    res.json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const markAllRead = async (req, res) => {
  try {
    await notificationService.markAllRead(req.user.id);

    res.json({
      success: true,
      message: "All notifications marked read",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
