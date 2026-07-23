import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HiOutlineBell,
  HiOutlineTicket,
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const mockNotifications = [
  {
    id: 1,
    title: "New ticket assigned",
    description: "Ticket #TK-1001 has been assigned to you.",
    read: false,
    icon: <HiOutlineTicket />,
  },
  {
    id: 2,
    title: "Customer replied",
    description: "John replied to Ticket #TK-1005.",
    read: false,
    icon: <HiOutlineChatAlt2 />,
  },
  {
    id: 3,
    title: "Ticket resolved",
    description: "Ticket #TK-0998 has been resolved.",
    read: true,
    icon: <HiOutlineCheckCircle />,
  },
];

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const unreadCount = useMemo(
    () => mockNotifications.filter((item) => !item.read).length,
    [],
  );

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

      {isOpen && (
        <div className="notification__dropdown">
          <div className="notification__header">
            <h4>Notifications</h4>
          </div>

          <ul className="notification__list">
            {mockNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`notification__item ${
                  !notification.read ? "notification__item--unread" : ""
                }`}
              >
                <span className="notification__icon">{notification.icon}</span>

                <div className="notification__content">
                  <p className="notification__title">{notification.title}</p>

                  <p className="notification__description">
                    {notification.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button type="button" className="notification__footer">
            View All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(NotificationBell);
