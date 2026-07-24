// src/components/layout/Navbar/ThemeToggle.jsx

import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import useTheme from "../../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isDarkMode = theme === "dark";

  return (
    <button
      type="button"
      className="navbar__icon-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {isDarkMode ? <HiSun size={22} /> : <HiMoon size={22} />}
    </button>
  );
};

export default React.memo(ThemeToggle);
