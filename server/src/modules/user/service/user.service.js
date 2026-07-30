import { ROLES } from "../../../constants/roles.constants.js";
import User from "../../../models/User.js";

export const getAgents = async () => {
  return User.find(
    {
      role: ROLES.AGENT,
    },
    "_id name email",
  ).sort({
    name: 1,
  });
};
