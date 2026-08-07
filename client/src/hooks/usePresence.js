import { useContext } from "react";

import PresenceContext from "../contexts/presence/PresenceContext";

const usePresence = () => {
  const context = useContext(PresenceContext);

  if (!context) {
    throw new Error("usePresence must be used within PresenceProvider");
  }

  return context;
};

export default usePresence;
