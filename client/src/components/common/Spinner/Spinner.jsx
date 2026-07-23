import React from "react";

const Spinner = ({ size = "sm" }) => {
  return (
    <span
      className={`loading-spinner loading-spinner-${size}`}
      aria-hidden="true"
    />
  );
};

export default Spinner;
