// src/components/layout/Navbar/NavbarActions.jsx

import React from "react";

import NotificationBell from "../../notification/NotificationBell";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

const NavbarActions = () => {
  return (
    <div className="navbar__actions" aria-label="Navbar actions">
      <ThemeToggle />

      <NotificationBell />

      <UserMenu />
    </div>
  );
};

export default React.memo(NavbarActions);
