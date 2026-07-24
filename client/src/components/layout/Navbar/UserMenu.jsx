import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import UserDropdown from "./UserDropdown";

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const avatarUrl = useMemo(() => {
    return (
      user?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "User",
      )}`
    );
  }, [user?.avatar, user?.name]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleProfile = useCallback(() => {
    navigate("/profile");
    closeMenu();
  }, [navigate, closeMenu]);

  const handleSettings = useCallback(() => {
    navigate("/settings");
    closeMenu();
  }, [navigate, closeMenu]);

  const handleLogout = useCallback(() => {
    logout();
    closeMenu();
  }, [logout, closeMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenu]);

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu__trigger"
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        <img
          src={avatarUrl}
          alt={user?.name || "User"}
          className="user-menu__avatar"
        />

        <div className="user-menu__info">
          <span className="user-menu__name">{user?.name || "Guest User"}</span>

          <span className="user-menu__role">{user?.role || "Customer"}</span>
        </div>

        <HiChevronDown className="user-menu__arrow" />
      </button>

      {isOpen && (
        <UserDropdown
          onProfile={handleProfile}
          onSettings={handleSettings}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default React.memo(UserMenu);
