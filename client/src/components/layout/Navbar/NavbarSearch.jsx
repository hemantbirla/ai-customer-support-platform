// src/components/layout/Navbar/NavbarSearch.jsx

import React, { useCallback, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const NavbarSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      // TODO:
      // Connect with global search functionality
      // Example:
      // navigate(`/tickets?search=${searchTerm}`);

      console.log("Searching:", searchTerm);
    },
    [searchTerm],
  );

  return (
    <form className="navbar-search" onSubmit={handleSubmit} role="search">
      <span className="navbar-search__icon" aria-hidden="true">
        <HiOutlineSearch size={18} />
      </span>

      <input
        type="text"
        className="navbar-search__input"
        placeholder="Search tickets..."
        aria-label="Search tickets"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
};

export default React.memo(NavbarSearch);
