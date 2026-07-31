import { FaTicketAlt, FaClock, FaCheckCircle, FaInbox } from "react-icons/fa";

export const dashboardStats = [
  {
    id: 1,
    title: "Open Tickets",
    value: 32,
    trend: "+8%",
    icon: FaTicketAlt,
  },
  {
    id: 2,
    title: "Pending Tickets",
    value: 14,
    trend: "+2%",
    icon: FaClock,
  },
  {
    id: 3,
    title: "Closed Tickets",
    value: 86,
    trend: "+12%",
    icon: FaCheckCircle,
  },
  {
    id: 4,
    title: "Avg Response",
    value: "2.3 hrs",
    trend: "-15%",
    icon: FaInbox,
  },
];

export const activityFeed = [
  {
    id: 1,
    title: "Ticket #1001 created",
    time: "5 mins ago",
  },
  {
    id: 2,
    title: "Agent assigned to Ticket #1002",
    time: "20 mins ago",
  },
  {
    id: 3,
    title: "Reply added to Ticket #1003",
    time: "1 hour ago",
  },
  {
    id: 4,
    title: "Ticket #1004 resolved",
    time: "Yesterday",
  },
];

export const quickActions = [
  {
    id: 1,
    label: "Create Ticket",
    path: "/tickets/new",
  },
  {
    id: 2,
    label: "View Tickets",
    path: "/tickets",
  },
  {
    id: 3,
    label: "Chat Support",
    path: "/chat",
  },
  {
    id: 4,
    label: "Profile",
    path: "/profile",
  },
];
