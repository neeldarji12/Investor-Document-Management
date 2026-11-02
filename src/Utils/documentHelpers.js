/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Utils/documentHelpers.js
 * 
 * Utility functions for filtering, grouping, date formatting,
 * and statistical aggregations across the document lifecycle.
 */

// Canonical list of supported statuses
export const DOCUMENT_STATUSES = [
  'Pending',
  'Uploaded',
  'Under Review',
  'Verified',
  'Rejected'
];

// Canonical list of categories
export const DOCUMENT_CATEGORIES = [
  'Identity',
  'Financial',
  'Immigration'
];

/**
 * Formats an ISO date string into a user-friendly readable date time.
 * @param {string|null} dateStr
 * @returns {string} e.g. "Mar 24, 2026, 03:45 PM" or "Not selected"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return 'Not available';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Invalid date';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Invalid date';
  }
};

/**
 * Calculates comprehensive dashboard statistics using JavaScript array reduce.
 * Does not mutate state.
 * @param {Array} documents
 * @returns {Object} statistics counts
 */
export const calculateStats = (documents = []) => {
  return documents.reduce(
    (acc, doc) => {
      acc.total += 1;
      switch (doc.status) {
        case 'Pending':
          acc.pending += 1;
          break;
        case 'Uploaded':
          acc.uploaded += 1;
          break;
        case 'Under Review':
          acc.underReview += 1;
          break;
        case 'Verified':
          acc.verified += 1;
          break;
        case 'Rejected':
          acc.rejected += 1;
          break;
        default:
          break;
      }
      return acc;
    },
    {
      total: 0,
      pending: 0,
      uploaded: 0,
      underReview: 0,
      verified: 0,
      rejected: 0
    }
  );
};

/**
 * Filters a list of documents based on search term, category, and status.
 * Uses immutable JavaScript filter() and trim() methods.
 * 
 * @param {Array} documents
 * @param {Object} filters - { searchTerm, category, status }
 * @returns {Array} filtered document array
 */
export const filterDocuments = (documents = [], { searchTerm = '', category = 'All', status = 'All' } = {}) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return documents.filter((doc) => {
    // 1. Search filter: check title and guidance
    const matchesSearch = normalizedSearch === '' ||
      doc.title.toLowerCase().includes(normalizedSearch) ||
      (doc.fileName && doc.fileName.toLowerCase().includes(normalizedSearch));

    // 2. Category filter
    const matchesCategory = category === 'All' || doc.category.toLowerCase() === category.toLowerCase();

    // 3. Status filter
    const matchesStatus = status === 'All' || doc.status.toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });
};

/**
 * Groups an array of documents by their category using reduce().
 * @param {Array} documents
 * @returns {Object} { Identity: [...], Financial: [...], Immigration: [...] }
 */
export const groupDocumentsByCategory = (documents = []) => {
  return documents.reduce((acc, doc) => {
    const cat = doc.category || 'Other';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(doc);
    return acc;
  }, {});
};

/**
 * Returns accessible CSS class suffix and theme color definitions for a status.
 * @param {string} status
 * @returns {{ className: string, label: string, color: string }}
 */
export const getStatusConfig = (status) => {
  switch (status) {
    case 'Verified':
      return {
        className: 'status-verified',
        label: 'Verified',
        color: '#16a34a'
      };
    case 'Under Review':
      return {
        className: 'status-under-review',
        label: 'Under Review',
        color: '#7c3aed'
      };
    case 'Uploaded':
      return {
        className: 'status-uploaded',
        label: 'Uploaded',
        color: '#2563eb'
      };
    case 'Rejected':
      return {
        className: 'status-rejected',
        label: 'Rejected',
        color: '#dc2626'
      };
    case 'Pending':
    default:
      return {
        className: 'status-pending',
        label: 'Pending',
        color: '#d97706'
      };
  }
};
