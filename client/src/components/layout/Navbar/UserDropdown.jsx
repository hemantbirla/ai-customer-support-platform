// src/components/layout/Navbar/UserDropdown.jsx

import React from "react";
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";

const UserDropdown = ({ onProfile, onSettings, onLogout }) => {
  return (
    <div className="user-dropdown" role="menu" aria-label="User menu">
      <button
        type="button"
        className="user-dropdown__item"
        onClick={onProfile}
        role="menuitem"
      >
        <HiOutlineUser size={18} />

        <span>Profile</span>
      </button>

      <button
        type="button"
        className="user-dropdown__item"
        onClick={onSettings}
        role="menuitem"
      >
        <HiOutlineCog size={18} />

        <span>Settings</span>
      </button>

      <div className="user-dropdown__divider" />

      <button
        type="button"
        className="user-dropdown__item user-dropdown__item--danger"
        onClick={onLogout}
        role="menuitem"
      >
        <HiOutlineLogout size={18} />

        <span>Logout</span>
      </button>
    </div>
  );
};

export default React.memo(UserDropdown);
