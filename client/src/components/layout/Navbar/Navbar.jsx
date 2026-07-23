import { Menu } from "lucide-react";
import { useSidebar } from "../../hooks/useSidebar";

function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <button type="button" onClick={toggleSidebar} aria-label="Toggle sidebar">
      <Menu size={20} />
    </button>
  );
}

export default Navbar;
