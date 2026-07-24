import mongoose from "mongoose";

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

const commentSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    attachments: [attachmentSchema],

    isInternal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ ticket: 1 });

commentSchema.index({ author: 1 });

export default mongoose.model("Comment", commentSchema);
