/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/FilterPanel.jsx
 * 
 * Interactive filter panel for switching categories (Identity, Financial, Immigration)
 * and statuses (Pending, Uploaded, Under Review, Verified, Rejected) with reset capability.
 */

import React from 'react';
import { FiRotateCcw, FiLayers, FiActivity } from 'react-icons/fi';
import { DOCUMENT_CATEGORIES, DOCUMENT_STATUSES } from '../Utils/documentHelpers.js';
import '../Styles/Components/filterPanel.css';

const FilterPanel = ({
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  onResetFilters,
  totalMatching,
  totalDocuments
}) => {
  const isFiltered = categoryFilter !== 'All' || statusFilter !== 'All';

  return (
    <div className="filter-panel" aria-label="Document Filters">
      <div className="filter-controls-row">
        {/* Category Filters */}
        <div className="filter-group">
          <span className="filter-label">
            <FiLayers aria-hidden="true" />
            Category:
          </span>
          <div className="filter-chips">
            <button
              type="button"
              className={`filter-chip ${categoryFilter === 'All' ? 'active' : ''}`}
              onClick={() => onCategoryChange('All')}
            >
              All Categories
            </button>
            {DOCUMENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filters */}
        <div className="filter-group">
          <span className="filter-label">
            <FiActivity aria-hidden="true" />
            Status:
          </span>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter documents by status"
          >
            <option value="All">All Statuses</option>
            {DOCUMENT_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {isFiltered && (
            <button
              type="button"
              className="btn-reset-filters"
              onClick={onResetFilters}
              title="Reset all filters"
            >
              <FiRotateCcw aria-hidden="true" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Meta feedback line */}
      <div className="filter-meta-row">
        <span>
          Showing <strong>{totalMatching}</strong> of <strong>{totalDocuments}</strong> documents
        </span>
        {isFiltered && (
          <div className="filter-active-pills">
            {categoryFilter !== 'All' && (
              <span className="active-pill">Category: {categoryFilter}</span>
            )}
            {statusFilter !== 'All' && (
              <span className="active-pill">Status: {statusFilter}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
