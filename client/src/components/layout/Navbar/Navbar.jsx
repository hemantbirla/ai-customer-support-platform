// src/components/layout/Navbar/Navbar.jsx

import React, { useCallback } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { useSidebar } from "../../../hooks/useSidebar";

import NavbarSearch from "./NavbarSearch";
import NavbarActions from "./NavbarActions";

import "./Navbar.css";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  const handleToggleSidebar = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  return (
    <header className="navbar" role="banner">
      {/* Mobile Sidebar Toggle */}
      <button
        type="button"
        className="navbar__menu-btn"
        onClick={handleToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <HiOutlineMenuAlt2 size={24} />
      </button>

      {/* Search */}
      <div className="navbar__search">
        <NavbarSearch />
      </div>

      {/* Right Actions */}
      <NavbarActions />
    </header>
  );
};

export default React.memo(Navbar);
