import { STATUS_TRANSITIONS } from "../constants/ticket.constants.js";

export const isValidStatusTransition = (currentStatus, nextStatus) => {
  if (!currentStatus || !nextStatus) {
    return false;
  }

  const allowedTransitions = STATUS_TRANSITIONS[currentStatus] || [];

  return allowedTransitions.includes(nextStatus);
};
