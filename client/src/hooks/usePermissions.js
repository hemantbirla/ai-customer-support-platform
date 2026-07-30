import { useMemo } from "react";
import useAuth from "./useAuth";
import { ROLES } from "../constants/roles.constants";

const usePermissions = () => {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) {
      return {
        canCreateTicket: false,
        canEditTicket: false,
        canDeleteTicket: false,
        canAssignAgent: false,
        canChangePriority: false,
        canChangeStatus: false,
        canViewActivity: false,
      };
    }

    const isAdmin = user.role === ROLES.ADMIN;
    const isAgent = user.role === ROLES.AGENT;
    const isCustomer = user.role === ROLES.CUSTOMER;

    return {
      canCreateTicket: isCustomer || isAdmin,
      canEditTicket: isAdmin,
      canDeleteTicket: isAdmin,
      canAssignAgent: isAdmin,
      canChangePriority: isAdmin,
      canChangeStatus: isAdmin || isAgent,
      canViewActivity: isAdmin || isAgent,
    };
  }, [user]);
};

export default usePermissions;
