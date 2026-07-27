import { lazy } from "react";

export const DashboardHome = lazy(
  () => import("../pages/Dashboard/DashboardHome"),
);

export const Analytics = lazy(() => import("../pages/Analytics/Analytics"));

export const Chat = lazy(() => import("../pages/Chat/Chat"));

export const Profile = lazy(() => import("../pages/Profile/Profile"));

export const Settings = lazy(() => import("../pages/Settings/Settings"));

export const TicketList = lazy(() => import("../pages/Tickets/TicketList"));

export const CreateTicket = lazy(() => import("../pages/Tickets/CreateTicket"));

export const TicketDetails = lazy(
  () => import("../pages/Tickets/TicketDetails"),
);

export const EditTicket = lazy(() => import("../pages/Tickets/EditTicket"));
