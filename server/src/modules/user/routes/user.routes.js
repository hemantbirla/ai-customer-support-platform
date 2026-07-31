import express from "express";

import authMiddleware from "../../../middleware/auth.middleware";
import { PERMISSIONS } from "../../../constants/permissions.constants";
import { getAgents } from "../controllers/user.controller";

const router = express.Router();

router.get(
  "/agents",
  authMiddleware,
  authorize(PERMISSIONS.ASSIGN_AGENT),
  getAgents,
);

export default router;
