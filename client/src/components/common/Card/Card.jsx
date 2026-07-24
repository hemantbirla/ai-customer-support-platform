import React from "react";
import "./Card.css";

const Card = ({
  children,
  className = "",
  padding = "md",
  shadow = true,
  border = true,
  hover = false,
  ...rest
}) => {
  const classes = [
    "card",
    `card-padding-${padding}`,
    shadow ? "card-shadow" : "",
    border ? "card-border" : "",
    hover ? "card-hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default React.memo(Card);
