import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  // Desktop state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* ---------------- Desktop ---------------- */

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

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
      // Desktop
      isCollapsed,
      toggleSidebar,
      collapseSidebar,
      expandSidebar,

      // Mobile
      isMobileOpen,
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
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within SidebarProvider");
  }

  return context;
}
