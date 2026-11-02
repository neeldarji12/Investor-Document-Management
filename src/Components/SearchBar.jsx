/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/SearchBar.jsx
 * 
 * Controlled search input for filtering documents dynamically by title or filename.
 */

import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import '../Styles/Components/searchBar.css';

const SearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search documents by title...'
}) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-input-container">
        <FiSearch className="search-icon" aria-hidden="true" />
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search input"
            title="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
