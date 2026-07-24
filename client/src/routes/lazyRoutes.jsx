import { lazy } from "react";

export const DashboardHome = lazy(
  () => import("../pages/dashboard/DashboardHome"),
);

export const Tickets = lazy(() => import("../pages/tickets/Tickets"));

export const Analytics = lazy(() => import("../pages/analytics/Analytics"));

export const Chat = lazy(() => import("../pages/chat/Chat"));

export const Profile = lazy(() => import("../pages/profile/Profile"));

export const Settings = lazy(() => import("../pages/settings/Settings"));
