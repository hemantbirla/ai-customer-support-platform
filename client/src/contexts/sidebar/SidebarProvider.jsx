import { useCallback, useEffect, useMemo, useState } from "react";

import SidebarContext from "./SidebarContext";

const SidebarProvider = ({ children }) => {
  // Desktop state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* ---------------- Sidebar Toggle ---------------- */

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth <= 767) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  }, []);

  /* ---------------- Desktop ---------------- */

  const collapseSidebar = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  /* ---------------- Mobile ---------------- */

  const openMobileSidebar = useCallback(() => {
    setIsMobileOpen(true);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  /* Prevent body scrolling while mobile drawer is open */

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const value = useMemo(
    () => ({
      isCollapsed,
      isMobileOpen,

      toggleSidebar,

      collapseSidebar,
      expandSidebar,

      openMobileSidebar,
      closeMobileSidebar,
      toggleMobileSidebar,
    }),
    [
      isCollapsed,
      isMobileOpen,
      toggleSidebar,
      collapseSidebar,
      expandSidebar,
      openMobileSidebar,
      closeMobileSidebar,
      toggleMobileSidebar,
    ],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export default SidebarProvider;
