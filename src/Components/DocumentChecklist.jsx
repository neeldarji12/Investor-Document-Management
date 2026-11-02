/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/DocumentChecklist.jsx
 * 
 * Groups documents by category (Identity, Financial, Immigration),
 * displays section metrics, category navigation chips, institutional table headers,
 * and maps documents to individual DocumentCard items.
 */

import React from 'react';
import { 
  FiCreditCard, 
  FiDollarSign, 
  FiGlobe, 
  FiFolder, 
  FiInbox 
} from 'react-icons/fi';
import DocumentCard from './DocumentCard.jsx';
import { groupDocumentsByCategory } from '../Utils/documentHelpers.js';
import '../Styles/Components/documentChecklist.css';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Identity':
      return <FiCreditCard aria-hidden="true" />;
    case 'Financial':
      return <FiDollarSign aria-hidden="true" />;
    case 'Immigration':
      return <FiGlobe aria-hidden="true" />;
    default:
      return <FiFolder aria-hidden="true" />;
  }
};

const DocumentChecklist = ({
  documents = [],
  mode = 'investor',
  onUpload,
  onReplace,
  onRequestRemove,
  onPreview,
  onStartReview,
  onVerify,
  onRequestReject,
  onResetFilters
}) => {
  // Empty state if no documents match search/filters
  if (documents.length === 0) {
    return (
      <div className="empty-results-box" role="region" aria-label="No documents found">
        <FiInbox className="empty-icon" aria-hidden="true" />
        <h3 className="empty-title">No documents match your query</h3>
        <p className="empty-description">
          We could not find any documents matching the current title search, category, or status filter. Try clearing or adjusting your filter criteria.
        </p>
        {onResetFilters && (
          <button
            type="button"
            className="empty-reset-btn"
            onClick={onResetFilters}
          >
            Clear All Active Filters
          </button>
        )}
      </div>
    );
  }

  // Group filtered documents by category
  const grouped = groupDocumentsByCategory(documents);
  const categoriesPresent = Object.keys(grouped);

  return (
    <div className={`checklist-container ${mode === 'reviewer' ? 'reviewer-checklist-view' : 'investor-checklist-view'}`}>
      {/* Category Navigation Bar */}
      <nav className="category-jump-nav" aria-label="Category Navigation">
        <span className="category-jump-label">PORTFOLIO CATEGORIES:</span>
        <div className="category-jump-pills">
          {categoriesPresent.map((cat) => (
            <a key={cat} href={`#cat-${cat.toLowerCase()}`} className="category-jump-pill">
              <span className="pill-dot"></span>
              <span>{cat} Documents</span>
              <span className="pill-count">{grouped[cat].length}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Reviewer Table Header (Only in Reviewer Mode) */}
      {mode === 'reviewer' && (
        <div className="reviewer-table-header" aria-hidden="true">
          <div className="table-col col-doc">DOCUMENT &amp; CRITERIA</div>
          <div className="table-col col-file">SUBMISSION FILE &amp; TIMESTAMP</div>
          <div className="table-col col-status">COMPLIANCE STATUS</div>
          <div className="table-col col-actions">AUDIT ACTIONS</div>
        </div>
      )}

      {/* Category Sections */}
      {categoriesPresent.map((category) => {
        const categoryDocs = grouped[category];
        const verifiedCount = categoryDocs.filter((d) => d.status === 'Verified').length;

        return (
          <section
            key={category}
            id={`cat-${category.toLowerCase()}`}
            className="category-group"
            aria-labelledby={`cat-heading-${category.toLowerCase()}`}
          >
            {/* Category Section Header */}
            <div className="category-header-banner">
              <div className="category-title-left">
                <div className="category-icon-pill" aria-hidden="true">
                  {getCategoryIcon(category)}
                </div>
                <h2 id={`cat-heading-${category.toLowerCase()}`} className="category-heading">
                  {category} Documents
                </h2>
              </div>
              <span className="category-count-badge">
                {verifiedCount} of {categoryDocs.length} Verified
              </span>
            </div>

            {/* Document cards list for this category */}
            <div className="category-cards-grid">
              {categoryDocs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  mode={mode}
                  onUpload={onUpload}
                  onReplace={onReplace}
                  onRequestRemove={onRequestRemove}
                  onPreview={onPreview}
                  onStartReview={onStartReview}
                  onVerify={onVerify}
                  onRequestReject={onRequestReject}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default DocumentChecklist;
