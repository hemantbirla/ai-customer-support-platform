import Counter from "../modules/counter/models/Counter.js";

const generateTicketNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "ticket" },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  return `TKT-${String(counter.sequence).padStart(6, "0")}`;
};

export default generateTicketNumber;
