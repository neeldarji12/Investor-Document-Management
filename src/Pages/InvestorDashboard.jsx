/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Pages/InvestorDashboard.jsx
 * 
 * Main investor dashboard view allowing investors to track document checklists,
 * upload required documents, inspect PDF/image previews, replace rejected files,
 * and filter/search their personal document repository.
 */

import React, { useState, useMemo } from 'react';
import { 
  FiX, 
  FiDownload, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiInfo, 
  FiAlertTriangle 
} from 'react-icons/fi';
import Dashboard from '../Components/Dashboard.jsx';
import DocumentChecklist from '../Components/DocumentChecklist.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import FilterPanel from '../Components/FilterPanel.jsx';
import ConfirmModal from '../Components/ConfirmModal.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';
import { filterDocuments, formatDate } from '../Utils/documentHelpers.js';
import { formatFileSize, isPdfFile } from '../Utils/fileValidation.js';
import '../Styles/Pages/investorDashboard.css';

const InvestorDashboard = ({
  documents,
  stats,
  actionNotification,
  onClearNotification,
  onUploadDocument,
  onReplaceDocument,
  onRemoveDocument
}) => {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Preview modal state
  const [previewDoc, setPreviewDoc] = useState(null);

  // Remove confirmation modal state
  const [docToRemove, setDocToRemove] = useState(null);

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

  const handleRequestRemove = (doc) => {
    setDocToRemove(doc);
  };

  const handleConfirmRemove = () => {
    if (docToRemove) {
      onRemoveDocument(docToRemove.id);
      setDocToRemove(null);
    }
  };

  const handleOpenPreview = (doc) => {
    setPreviewDoc(doc);
  };

  const handleClosePreview = () => {
    setPreviewDoc(null);
  };

  return (
    <div className="investor-dashboard-page">
      {/* Metrics & Overview Banner */}
      <Dashboard
        pretitle="Investor Self-Service Portal"
        title="Investor Document Management"
        subtitle="Upload, verify, and maintain all mandatory identification, financial, and immigration records required for KYC approval."
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

        {/* Toolbar: Search & Filters */}
        <section className="dashboard-toolbar" aria-label="Document Controls">
          <div className="toolbar-top-row">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search document by title or filename..."
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

        {/* Categorized Document Checklist */}
        <DocumentChecklist
          documents={filteredDocs}
          mode="investor"
          onUpload={onUploadDocument}
          onReplace={onReplaceDocument}
          onRequestRemove={handleRequestRemove}
          onPreview={handleOpenPreview}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Document Removal Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(docToRemove)}
        title="Remove Uploaded Document"
        message={
          docToRemove ? (
            <div>
              <p>
                Are you sure you want to remove <strong>"{docToRemove.title}"</strong> (File: {docToRemove.fileName})?
              </p>
              <p style={{ marginTop: '0.5rem', color: '#dc2626', fontSize: '0.825rem' }}>
                This file will be permanently cleared and the document status will revert to <strong>Pending</strong>.
              </p>
            </div>
          ) : ''
        }
        confirmText="Yes, Remove Document"
        cancelText="Keep Document"
        type="danger"
        onConfirm={handleConfirmRemove}
        onCancel={() => setDocToRemove(null)}
      />

      {/* Document Preview Modal */}
      {previewDoc && (
        <div
          className="preview-modal-backdrop"
          onClick={handleClosePreview}
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
        >
          <div
            className="preview-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="preview-modal-header">
              <div className="preview-title-group">
                <h3 id="preview-modal-title" className="preview-modal-title">
                  {previewDoc.title}
                </h3>
                <span className="preview-modal-subtitle">
                  {previewDoc.category} Category • {previewDoc.fileName || 'Document File'} ({formatFileSize(previewDoc.fileSize)})
                </span>
              </div>

              <div className="preview-header-actions">
                <StatusBadge status={previewDoc.status} size="sm" />
                {previewDoc.previewUrl && (
                  <a
                    href={previewDoc.previewUrl}
                    download={previewDoc.fileName || `${previewDoc.title}.pdf`}
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
                  onClick={handleClosePreview}
                  aria-label="Close preview"
                >
                  <FiX />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="preview-modal-body">
              {previewDoc.previewUrl ? (
                isPdfFile(previewDoc.fileType, previewDoc.fileName) ? (
                  <iframe
                    src={previewDoc.previewUrl}
                    title={`Preview of ${previewDoc.title}`}
                    className="preview-pdf-frame"
                  />
                ) : (
                  <img
                    src={previewDoc.previewUrl}
                    alt={`Preview of ${previewDoc.title}`}
                    className="preview-image"
                  />
                )
              ) : (
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  <p>No preview visual is available for this document.</p>
                </div>
              )}
            </div>

            {/* Footer with audit metadata */}
            <div className="preview-modal-footer">
              <span>Selected at: {formatDate(previewDoc.selectedAt)}</span>
              <span>DJ Investor Portal Secure Document Viewer</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorDashboard;
