import { useEffect, useId, useRef, useState } from "react";
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
  const triggerRef = useRef(null);

  const menuId = useId();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const firstItem = dropdownRef.current?.querySelector(
      "[role='menuitem']:not([aria-disabled='true'])",
    );

    firstItem?.focus();
  }, [isOpen]);

  const handleItemClick = (item) => {
    if (item.disabled) return;

    onSelect?.(item);
    closeDropdown();
  };

  const handleItemKeyDown = (event, item) => {
    const menuItems = [
      ...dropdownRef.current.querySelectorAll(
        "[role='menuitem']:not([aria-disabled='true'])",
      ),
    ];

    const currentIndex = menuItems.indexOf(event.currentTarget);

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleItemClick(item);
        break;

      case "ArrowDown":
        event.preventDefault();
        menuItems[(currentIndex + 1) % menuItems.length]?.focus();
        break;

      case "ArrowUp":
        event.preventDefault();
        menuItems[
          (currentIndex - 1 + menuItems.length) % menuItems.length
        ]?.focus();
        break;

      case "Escape":
        closeDropdown();
        break;

      default:
        break;
    }
  };

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        className="dropdown-trigger"
        onClick={toggleDropdown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {trigger}
      </button>

      {isOpen && (
        <ul
          id={menuId}
          className={`dropdown-menu dropdown-${align}`}
          role="menu"
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <li
                  key={`divider-${index}`}
                  className="dropdown-divider"
                  role="presentation"
                />
              );
            }

            return (
              <li
                key={item.id ?? index}
                role="menuitem"
                tabIndex={item.disabled ? -1 : 0}
                aria-disabled={item.disabled}
                className={`
                  dropdown-item
                  ${item.danger ? "danger" : ""}
                  ${item.disabled ? "disabled" : ""}
                `}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => handleItemKeyDown(e, item)}
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
