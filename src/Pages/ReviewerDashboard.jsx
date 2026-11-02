/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Pages/ReviewerDashboard.jsx
 * 
 * Reviewer / Compliance Officer workspace to inspect uploaded investor files,
 * initiate document reviews, formally verify eligible submissions, or reject
 * non-compliant documents with mandatory audit feedback.
 */

import React, { useState, useMemo } from 'react';
import { 
  FiArrowRight, 
  FiDownload, 
  FiX, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiInfo, 
  FiAlertTriangle, 
  FiShield,
  FiClock,
  FiRotateCcw
} from 'react-icons/fi';
import Dashboard from '../Components/Dashboard.jsx';
import DocumentChecklist from '../Components/DocumentChecklist.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import FilterPanel from '../Components/FilterPanel.jsx';
import ReviewPanel from '../Components/ReviewPanel.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';
import { filterDocuments, formatDate } from '../Utils/documentHelpers.js';
import { formatFileSize, isPdfFile } from '../Utils/fileValidation.js';
import '../Styles/Pages/reviewerDashboard.css';

const ReviewerDashboard = ({
  documents,
  stats,
  actionNotification,
  onClearNotification,
  onStartReview,
  onVerifyDocument,
  onRejectDocument
}) => {
  // Search & filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Preview / Inspection state
  const [inspectDoc, setInspectDoc] = useState(null);

  // Reject review panel modal state
  const [docToReject, setDocToReject] = useState(null);

  // Filtered documents using pure calculation (no unnecessary useEffect)
  const filteredDocs = useMemo(() => {
    return filterDocuments(documents, {
      searchTerm,
      category: categoryFilter,
      status: statusFilter
    });
  }, [documents, searchTerm, categoryFilter, statusFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setStatusFilter('All');
  };

  const handleOpenRejectModal = (doc) => {
    setDocToReject(doc);
  };

  const handleConfirmRejection = (docId, reason) => {
    const success = onRejectDocument(docId, reason);
    if (success !== false) {
      setDocToReject(null);
    }
  };

  const pendingActionCount = (stats.uploaded || 0) + (stats.underReview || 0);

  return (
    <div className="reviewer-dashboard-page">
      {/* Metrics & Overview Banner */}
      <Dashboard
        pretitle="Compliance & Audit Portal"
        title="Reviewer Document Verification"
        subtitle="Evaluate investor document submissions, verify credentials, and enforce regulatory compliance."
        stats={stats}
      />

      <main className="dashboard-main-container">
        {/* Temporary Notification Banner */}
        {actionNotification && (
          <div
            className={`action-notification-banner ${actionNotification.type}`}
            role="alert"
          >
            <div className="notification-content">
              {actionNotification.type === 'success' && <FiCheckCircle aria-hidden="true" />}
              {actionNotification.type === 'error' && <FiAlertTriangle aria-hidden="true" />}
              {actionNotification.type === 'warning' && <FiAlertCircle aria-hidden="true" />}
              {actionNotification.type === 'info' && <FiInfo aria-hidden="true" />}
              <span>{actionNotification.message}</span>
            </div>
            <button
              type="button"
              className="notification-close-btn"
              onClick={onClearNotification}
              aria-label="Dismiss notification"
            >
              <FiX />
            </button>
          </div>
        )}

        {/* Highlight Banner: Compliance Verification & Audit Queue */}
        <section className="review-queue-highlight" aria-label="Review Priority Queue">
          <div className="queue-highlight-main">
            <div className="queue-live-pill">
              <span className="live-pulse-dot" aria-hidden="true"></span>
              <span>LIVE COMPLIANCE QUEUE • SEC / FINRA AUDIT LEDGER</span>
            </div>
            <div className="queue-highlight-text">
              <h2 className="queue-highlight-title">
                <FiShield aria-hidden="true" />
                <span>Reviewer Verification &amp; Audit Queue</span>
              </h2>
              <p className="queue-highlight-desc">
                Currently <strong>{pendingActionCount}</strong> documents require compliance review (<strong>{stats.uploaded}</strong> ready, <strong>{stats.underReview}</strong> in progress), while <strong>{stats.pending}</strong> remain pending initial investor upload.
              </p>
            </div>
          </div>

          {/* Metric Stats Pills */}
          <div className="queue-stats-row">
            <button
              type="button"
              className={`queue-stat-pill ${statusFilter === 'Uploaded' ? 'active' : ''}`}
              onClick={() => setStatusFilter(statusFilter === 'Uploaded' ? 'All' : 'Uploaded')}
              title="Filter by Ready for Review"
            >
              <span className="pill-dot blue"></span>
              <span className="pill-label">Ready for Review:</span>
              <span className="pill-number">{stats.uploaded}</span>
            </button>

            <button
              type="button"
              className={`queue-stat-pill ${statusFilter === 'Under Review' ? 'active' : ''}`}
              onClick={() => setStatusFilter(statusFilter === 'Under Review' ? 'All' : 'Under Review')}
              title="Filter by Under Active Review"
            >
              <span className="pill-dot purple"></span>
              <span className="pill-label">Under Inspection:</span>
              <span className="pill-number">{stats.underReview}</span>
            </button>

            <button
              type="button"
              className={`queue-stat-pill amber ${statusFilter === 'Pending' ? 'active' : ''}`}
              onClick={() => setStatusFilter(statusFilter === 'Pending' ? 'All' : 'Pending')}
              title="Filter by Pending Investor Submissions"
            >
              <span className="pill-dot amber"></span>
              <span className="pill-label">Pending Investor:</span>
              <span className="pill-number">{stats.pending}</span>
            </button>
          </div>
        </section>

        {/* Dedicated Pending Investor Submissions Notice Banner (Shown when filtering by Pending or as dedicated callout) */}
        {statusFilter === 'Pending' && (
          <div className="reviewer-pending-callout" role="region" aria-label="Pending Documents Notice">
            <div className="pending-callout-icon" aria-hidden="true">
              <FiClock />
            </div>
            <div className="pending-callout-content">
              <h3 className="pending-callout-title">
                Investor Submission Pending • {stats.pending} Mandatory Documents Awaiting Upload
              </h3>
              <p className="pending-callout-desc">
                These required KYC documents have not yet been uploaded by investor <strong>David Jenkins</strong>. 
                Compliance officers cannot inspect or certify these records until valid files are submitted by the investor.
              </p>
            </div>
            <button
              type="button"
              className="pending-callout-btn"
              onClick={() => setStatusFilter('All')}
            >
              <FiRotateCcw aria-hidden="true" />
              <span>Show All Queue Items</span>
            </button>
          </div>
        )}

        {/* Compliance Workflow Lifecycle Diagram Bar */}
        <section className="reviewer-workflow-banner" aria-label="Verification Workflow Stages">
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#334155' }}>
            Compliance Workflow:
          </span>
          <div className="workflow-steps-group">
            <div className={`workflow-step ${statusFilter === 'Pending' ? 'highlight-amber' : ''}`}>
              <FiClock aria-hidden="true" />
              <span>1. Pending (Investor Upload)</span>
            </div>
            <FiArrowRight className="workflow-arrow" aria-hidden="true" />
            <div className={`workflow-step ${statusFilter === 'Uploaded' ? 'highlight-blue' : 'active'}`}>
              <span>2. Uploaded (Queued)</span>
            </div>
            <FiArrowRight className="workflow-arrow" aria-hidden="true" />
            <div className={`workflow-step ${statusFilter === 'Under Review' ? 'highlight-purple' : 'active'}`}>
              <span>3. Under Review (Officer)</span>
            </div>
            <FiArrowRight className="workflow-arrow" aria-hidden="true" />
            <div className="workflow-step" style={{ color: '#16a34a', borderColor: '#bbf7d0', background: '#F0FDF4' }}>
              <span>4. Verified (Certified)</span>
            </div>
            <span style={{ margin: '0 4px', color: '#94a3b8' }}>or</span>
            <div className="workflow-step" style={{ color: '#dc2626', borderColor: '#fecaca', background: '#FEF2F2' }}>
              <span>Rejected (Resubmit)</span>
            </div>
          </div>
        </section>

        {/* Toolbar: Search & Filters */}
        <section className="dashboard-toolbar" aria-label="Reviewer Controls">
          <div className="toolbar-top-row">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search submissions by title or filename..."
            />
          </div>

          <FilterPanel
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onResetFilters={handleResetFilters}
            totalMatching={filteredDocs.length}
            totalDocuments={documents.length}
          />
        </section>

        {/* Categorized Document Checklist for Reviewer */}
        <DocumentChecklist
          documents={filteredDocs}
          mode="reviewer"
          onStartReview={onStartReview}
          onVerify={onVerifyDocument}
          onRequestReject={handleOpenRejectModal}
          onPreview={(doc) => setInspectDoc(doc)}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Rejection Panel Modal (Requires reason) */}
      <ReviewPanel
        isOpen={Boolean(docToReject)}
        document={docToReject}
        onConfirmReject={handleConfirmRejection}
        onClose={() => setDocToReject(null)}
      />

      {/* Document Inspector / Preview Modal */}
      {inspectDoc && (
        <div
          className="preview-modal-backdrop"
          onClick={() => setInspectDoc(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reviewer-preview-title"
        >
          <div
            className="preview-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="preview-modal-header">
              <div className="preview-title-group">
                <h3 id="reviewer-preview-title" className="preview-modal-title">
                  Inspect Submission: {inspectDoc.title}
                </h3>
                <span className="preview-modal-subtitle">
                  Category: {inspectDoc.category} • File: {inspectDoc.fileName || 'N/A'} ({formatFileSize(inspectDoc.fileSize)})
                </span>
              </div>

              <div className="preview-header-actions">
                <StatusBadge status={inspectDoc.status} size="sm" />
                {inspectDoc.previewUrl && (
                  <a
                    href={inspectDoc.previewUrl}
                    download={inspectDoc.fileName || `${inspectDoc.title}.pdf`}
                    className="preview-btn-action"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiDownload aria-hidden="true" />
                    <span>Download</span>
                  </a>
                )}
                <button
                  type="button"
                  className="preview-btn-action"
                  onClick={() => setInspectDoc(null)}
                  aria-label="Close inspector"
                >
                  <FiX />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="preview-modal-body">
              {inspectDoc.previewUrl ? (
                isPdfFile(inspectDoc.fileType, inspectDoc.fileName) ? (
                  <iframe
                    src={inspectDoc.previewUrl}
                    title={`Inspector preview of ${inspectDoc.title}`}
                    className="preview-pdf-frame"
                  />
                ) : (
                  <img
                    src={inspectDoc.previewUrl}
                    alt={`Inspector preview of ${inspectDoc.title}`}
                    className="preview-image"
                  />
                )
              ) : (
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  <p>No document visual submitted yet.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="preview-modal-footer">
              <span>Submitted by Investor at: {formatDate(inspectDoc.selectedAt)}</span>
              <span>Official DJ Portal Review Audit</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewerDashboard;
