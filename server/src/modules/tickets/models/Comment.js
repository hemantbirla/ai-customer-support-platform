import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      trim: true,
    },
    storedName: {
      type: String,
      trim: true,
    },
    mimeType: {
      type: String,
      trim: true,
    },
    size: {
      type: Number,
    },
    url: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const commentSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
      index: true,
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
      minlength: 2,
      maxlength: 5000,
    },

    attachments: [
      {
        originalName: String,
        storedName: String,
        mimeType: String,
        size: Number,
        url: String,
      },
    ],

    isInternal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({
  ticket: 1,
  createdAt: 1,
});

export default mongoose.model("Comment", commentSchema);
