import { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

const Dropdown = ({
  trigger,
  items = [],
  onSelect,
  align = "right",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.disabled) return;

    onSelect?.(item);
    closeDropdown();
  };

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-trigger"
        onClick={toggleDropdown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      {isOpen && (
        <ul className={`dropdown-menu dropdown-${align}`} role="menu">
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <li key={`divider-${index}`} className="dropdown-divider" />
              );
            }

            return (
              <li
                key={item.id ?? index}
                role="menuitem"
                tabIndex={0}
                className={`
                  dropdown-item
                  ${item.danger ? "danger" : ""}
                  ${item.disabled ? "disabled" : ""}
                `}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleItemClick(item);
                  }
                }}
              >
                {item.icon && (
                  <span className="dropdown-icon">{item.icon}</span>
                )}

                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
