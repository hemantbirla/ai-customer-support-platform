import Activity from "../models/Activity.js";

export const createActivity = async ({
  ticket,
  action,
  user,
  previousValue = null,
  newValue = null,
}) => {
  return Activity.create({
    ticket,
    action,
    user,
    previousValue,
    newValue,
  });
};
