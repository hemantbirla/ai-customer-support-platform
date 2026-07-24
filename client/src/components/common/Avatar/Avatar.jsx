import React, { useMemo, useState } from "react";
import "./Avatar.css";

const Avatar = ({
  src,
  alt = "User Avatar",
  name = "",
  size = "md",
  className = "",
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = useMemo(() => {
    if (!name.trim()) return "?";

    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  }, [name]);

  const showFallback = !src || imageError;

  return (
    <div
      className={`avatar avatar--${size} ${className}`}
      aria-label={alt}
      {...rest}
    >
      {showFallback ? (
        <span className="avatar__initials">{initials}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          className="avatar__image"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};

export default React.memo(Avatar);
