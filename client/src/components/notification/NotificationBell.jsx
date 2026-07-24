import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";

import { useNotifications } from "../../contexts/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = () => {
  const { unreadCount } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeDropdown]);

  return (
    <div className="notification" ref={dropdownRef}>
      <button
        type="button"
        className="navbar__icon-btn"
        aria-label="Notifications"
        onClick={toggleDropdown}
      >
        <HiOutlineBell size={22} />

        {unreadCount > 0 && (
          <span className="navbar__badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && <NotificationDropdown closeDropdown={closeDropdown} />}
    </div>
  );
};

export default memo(NotificationBell);
