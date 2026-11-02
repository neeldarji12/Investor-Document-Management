/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/ReviewPanel.jsx
 * 
 * Rejection workflow modal requiring reviewers to select or write a mandatory
 * rejection reason with preset compliance templates before returning the document to the investor.
 */

import React, { useState } from 'react';
import { FiX, FiAlertOctagon } from 'react-icons/fi';
import '../Styles/Components/reviewPanel.css';

const REASON_TEMPLATES = [
  'Blurred scan: Document numbers or biographical details are illegible.',
  'Expired document: Identification validity period has expired.',
  'Missing pages: Back page / reverse side of document is missing.',
  'Name mismatch: Document name does not match the registered investor KYC name.',
  'Incomplete statement: Needs consecutive 6-month statement with official bank seal.'
];

const ReviewPanel = ({
  isOpen,
  document,
  onConfirmReject,
  onClose
}) => {
  const [reasonText, setReasonText] = useState('');
  const [errorNotice, setErrorNotice] = useState('');

  if (!isOpen || !document) return null;

  const handleApplyTemplate = (template) => {
    setReasonText(template);
    setErrorNotice('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reasonText.trim()) {
      setErrorNotice('A rejection reason is strictly mandatory so the investor can rectify the document.');
      return;
    }
    onConfirmReject(document.id, reasonText.trim());
    setReasonText('');
    setErrorNotice('');
  };

  const handleClose = () => {
    setReasonText('');
    setErrorNotice('');
    onClose();
  };

  return (
    <div className="review-panel-modal" role="dialog" aria-modal="true" aria-labelledby="reject-dialog-title">
      <div className="review-panel-card">
        {/* Header */}
        <div className="review-panel-header">
          <div className="review-header-title">
            <FiAlertOctagon className="icon-danger" aria-hidden="true" />
            <h3 id="reject-dialog-title">Reject Document Submission</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close rejection dialog"
          >
            <FiX />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="review-panel-body">
            <div className="doc-summary-badge">
              <div>
                <div className="doc-summary-name">{document.title}</div>
                <div className="doc-summary-cat">{document.category} • File: {document.fileName || 'N/A'}</div>
              </div>
            </div>

            <div>
              <div className="reason-templates-title">Quick Compliance Rejection Templates:</div>
              <div className="template-chips-grid">
                {REASON_TEMPLATES.map((tmpl, index) => (
                  <button
                    key={index}
                    type="button"
                    className="template-chip-btn"
                    onClick={() => handleApplyTemplate(tmpl)}
                  >
                    {tmpl.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="rejection-textarea" className="reason-textarea-label">
                <span>Detailed Rejection Reason (Mandatory):</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {reasonText.length} characters
                </span>
              </label>
              <textarea
                id="rejection-textarea"
                className="reason-textarea"
                value={reasonText}
                onChange={(e) => {
                  setReasonText(e.target.value);
                  if (errorNotice) setErrorNotice('');
                }}
                placeholder="Explain clearly why this document was rejected and what specific corrections the investor needs to make..."
                rows={4}
                required
              />
              {errorNotice && (
                <p style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.35rem' }}>
                  {errorNotice}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="review-panel-footer">
            <button
              type="button"
              className="modal-btn modal-btn-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-reject-confirm"
              disabled={!reasonText.trim()}
            >
              Confirm Rejection &amp; Notify Investor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewPanel;
