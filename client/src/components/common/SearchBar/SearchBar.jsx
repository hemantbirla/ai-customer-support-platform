// src/components/common/SearchBar/SearchBar.jsx

import React, { useCallback } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import "./SearchBar.css";

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  ...rest
}) => {
  const handleClear = useCallback(() => {
    onChange?.({
      target: {
        value: "",
      },
    });
  }, [onChange]);

  return (
    <div className={`search-bar ${className}`}>
      <FiSearch className="search-icon" aria-hidden="true" />

      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
        {...rest}
      />

      {value && (
        <button
          type="button"
          className="clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
