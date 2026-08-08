import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "NEW_TICKET",
        "NEW_REPLY",
        "STATUS_CHANGED",
        "TICKET_ASSIGNED",
        "AI_REPLY_READY",
        "AI_SUMMARY_READY",
        "PRIORITY_CHANGED",
      ],
      required: true,
    },

    link: {
      type: String,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Notification", notificationSchema);
