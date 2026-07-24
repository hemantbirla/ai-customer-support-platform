import mongoose from "mongoose";
import { ACTIVITY_ACTION } from "../constants/ticket.constants.js";

const activitySchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    action: {
      type: String,
      enum: Object.values(ACTIVITY_ACTION),
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    previousValue: {
      type: mongoose.Schema.Types.Mixed,
    },

    newValue: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

activitySchema.index({ ticket: 1 });

activitySchema.index({ createdAt: -1 });

export default mongoose.model("Activity", activitySchema);
