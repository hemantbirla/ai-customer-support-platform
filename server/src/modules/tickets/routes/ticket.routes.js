import express from "express";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTickets,
  updateTicket,
} from "../controllers/ticket.controller.js";
import authMiddleware from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTicket);
// router.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Ticket API Working",
//   });
// });
router.get("/", authMiddleware, getTickets);

router.get("/:id", authMiddleware, getTicketById);

router.put("/:id", authMiddleware, updateTicket);

router.delete("/:id", authMiddleware, deleteTicket);

export default router;
