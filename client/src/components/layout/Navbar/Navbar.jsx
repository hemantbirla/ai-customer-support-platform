// src/components/layout/Navbar/Navbar.jsx

import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { useSidebar } from "../../../hooks/useSidebar";

import NavbarSearch from "./NavbarSearch";
import NavbarActions from "./NavbarActions";

import "./Navbar.css";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="navbar">
      {/* Mobile Sidebar Toggle */}
      <button
        type="button"
        className="navbar__menu-btn"
        onClick={toggleSidebar}
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
