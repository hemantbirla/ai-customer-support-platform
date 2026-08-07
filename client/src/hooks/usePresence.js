import { useContext } from "react";

import { PresenceContext } from "../contexts/presence";

const usePresence = () => {
  const context = useContext(PresenceContext);

  if (!context) {
    throw new Error("usePresence must be used inside PresenceProvider");
  }

  return context;
};

export default usePresence;
