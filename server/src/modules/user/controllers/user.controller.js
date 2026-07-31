import asyncHandler from "../../../utils/asyncHandler.js";
import * as userService from "../services/user.service.js";

export const getAgents = asyncHandler(async (req, res) => {
  const agents = await userService.getAgents();

  return res.status(200).json({
    success: true,
    data: {
      agents,
    },
  });
});
