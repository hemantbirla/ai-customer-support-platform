import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

import "./Breadcrumb.css";

const formatLabel = (segment) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = () => {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    const items = [
      {
        label: "Dashboard",
        path: "/dashboard",
        isLast: segments.length === 1 && segments[0] === "dashboard",
      },
    ];

    // Remove "dashboard" because it's already added above
    if (segments[0] === "dashboard") {
      segments.shift();
    }

    segments.forEach((segment, index) => {
      items.push({
        label: formatLabel(segment),
        path: `/dashboard/${segments.slice(0, index + 1).join("/")}`,
        isLast: index === segments.length - 1,
      });
    });

    return items;
  }, [pathname]);

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((item) => (
          <li
            key={item.path}
            className={`breadcrumb-item ${item.isLast ? "active" : ""}`}
          >
            {item.isLast ? (
              <span>{item.label}</span>
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
