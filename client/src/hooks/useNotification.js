import { useContext } from "react";
import NotificationProvider from "../contexts/NotificationContext";

const useNotification = () => {
  return useContext(NotificationProvider);
};

export default useNotification;
