import React from "react";
import Styles from "./SearchBar.module.css"; // optional, for custom styling

const SearchBar = ({ value, onChange, placeholder = "🔍 Search..." }) => {
  return (
    <input
      className={`form-control me-2 ${Styles.search}`} // Bootstrap + CSS module
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
