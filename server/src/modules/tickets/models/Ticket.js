import mongoose from "mongoose";
import {
  TICKET_STATUS,
  TICKET_PRIORITY,
  TICKET_CATEGORY,
} from "../constants/ticket.constants.js";

const attachmentSchema = new mongoose.Schema(
  {
    originalName: String,
    storedName: String,
    mimeType: String,
    size: Number,
    url: String,
  },
  { _id: false },
);

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 150,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 20,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    category: {
      type: String,
      enum: Object.values(TICKET_CATEGORY),
      default: TICKET_CATEGORY.GENERAL,
    },

    priority: {
      type: String,
      enum: Object.values(TICKET_PRIORITY),
      default: TICKET_PRIORITY.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(TICKET_STATUS),
      default: TICKET_STATUS.OPEN,
    },

    attachments: [attachmentSchema],

    tags: {
      type: [String],
      default: [],
    },

    aiSummary: String,
    aiPriority: String,
    aiCategory: String,
    aiSentiment: String,

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

ticketSchema.index({ ticketNumber: 1 });
ticketSchema.index({ status: 1 });
ticketSchema.index({ priority: 1 });
ticketSchema.index({ customer: 1 });
ticketSchema.index({ assignedAgent: 1 });
ticketSchema.index({ createdAt: -1 });
ticketSchema.index({ subject: "text", description: "text" });

ticketSchema.virtual("isDeleted").get(function () {
  return !!this.deletedAt;
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
