import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TicketSearch = ({
  value = "",
  onSearch,
  placeholder = "Search tickets...",
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() !== value) {
        onSearch(searchTerm.trim());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, value, onSearch]);

  return (
    <input
      type="text"
      value={searchTerm}
      placeholder={placeholder}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

TicketSearch.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TicketSearch;
