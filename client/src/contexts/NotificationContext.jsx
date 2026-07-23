import { createContext } from "react";

export const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
