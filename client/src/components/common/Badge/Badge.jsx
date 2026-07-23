import "./Badge.css";

const Badge = ({
  children,
  variant = "gray",
  rounded = true,
  className = "",
  ...rest
}) => {
  return (
    <span
      className={`badge badge--${variant} ${
        rounded ? "badge--rounded" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
