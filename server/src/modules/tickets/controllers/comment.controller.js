import asyncHandler from "../../../utils/asyncHandler.js";
import * as commentService from "../services/comment.service.js";

/**
 * Create Comment / Internal Note
 * POST /api/tickets/:id/comments
 */
export const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(
    req.params.ticketId,
    req.body,
    req.files,
    req.user,
  );

  return res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: {
      comment,
    },
  });
});

/**
 * Get Ticket Comments
 * GET /api/tickets/:id/comments
 */
export const getComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getComments(
    req.params.ticketId,
    req.user,
  );

  return res.status(200).json({
    success: true,
    message: "Comments fetched successfully",
    data: {
      comments,
    },
  });
});
