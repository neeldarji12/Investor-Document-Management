/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/DocumentCard.jsx
 * 
 * Comprehensive card component rendering document guidance, current status badge,
 * file metadata, rejection callout banners, and contextual action buttons
 * for both Investor Mode and Reviewer Mode workflows.
 */

import React, { useState } from 'react';
import { 
  FiFileText, 
  FiImage, 
  FiEye, 
  FiUploadCloud, 
  FiTrash2, 
  FiRefreshCw, 
  FiCheckCircle, 
  FiXCircle, 
  FiCalendar, 
  FiAlertTriangle,
  FiPlay,
  FiClock
} from 'react-icons/fi';
import StatusBadge from './StatusBadge.jsx';
import UploadControl from './UploadControl.jsx';
import { formatFileSize, isPdfFile, getFileTypeBadge } from '../Utils/fileValidation.js';
import { formatDate } from '../Utils/documentHelpers.js';
import '../Styles/Components/documentCard.css';

const DocumentCard = ({
  document,
  mode = 'investor',
  onUpload,
  onReplace,
  onRequestRemove,
  onPreview,
  onStartReview,
  onVerify,
  onRequestReject
}) => {
  const [showUploadControl, setShowUploadControl] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);

  const {
    id,
    title,
    category,
    guidance,
    required,
    status,
    fileName,
    fileType,
    fileSize,
    selectedAt,
    rejectionReason
  } = document;

  // Determine status border modifier
  const statusBorderClass = `status-border-${status.toLowerCase().replace(/\s+/g, '-')}`;

  const handleUploadSubmit = (file) => {
    if (isReplacing) {
      onReplace(id, file);
    } else {
      onUpload(id, file);
    }
    setShowUploadControl(false);
    setIsReplacing(false);
  };

  const handleStartUpload = (replace = false) => {
    setIsReplacing(replace);
    setShowUploadControl(true);
  };

  const handleCancelUpload = () => {
    setShowUploadControl(false);
    setIsReplacing(false);
  };

  return (
    <article 
      className={`document-card ${statusBorderClass} ${mode === 'reviewer' ? 'reviewer-card-mode' : 'investor-card-mode'} ${status === 'Pending' ? 'is-status-pending' : ''}`} 
      aria-labelledby={`doc-title-${id}`}
    >
      {/* Top Header / Column 1 */}
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-title-row">
            <h3 id={`doc-title-${id}`} className="card-title">{title}</h3>
            {required && <span className="tag-required">Mandatory</span>}
            <span className="tag-category">{category}</span>
          </div>
          <p className="card-guidance">{guidance}</p>
        </div>
        {mode === 'investor' && <StatusBadge status={status} size="sm" />}
      </div>

      {/* Uploaded File Details / Column 2 */}
      {fileName ? (
        <div className="card-file-details">
          <div className="file-info-main">
            <div className="file-format-icon" aria-hidden="true">
              {isPdfFile(fileType, fileName) ? <FiFileText /> : <FiImage />}
            </div>
            <div className="file-text-meta">
              <span className="file-name" title={fileName}>{fileName}</span>
              <div className="file-submeta">
                <span>{getFileTypeBadge(fileType, fileName)}</span>
                <span>•</span>
                <span>{formatFileSize(fileSize)}</span>
                <span>•</span>
                <span className="file-date">
                  <FiCalendar aria-hidden="true" />
                  {formatDate(selectedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : mode === 'reviewer' ? (
        <div className="reviewer-pending-file-cell">
          <div className="pending-file-chip">
            <FiClock aria-hidden="true" />
            <span>No File Uploaded</span>
          </div>
          <span className="pending-file-subtext">Awaiting investor upload</span>
        </div>
      ) : null}

      {/* Dedicated Status Cell for Reviewer Table (Column 3) */}
      {mode === 'reviewer' && (
        <div className="reviewer-status-cell">
          <StatusBadge status={status} size="sm" />
        </div>
      )}

      {/* Inline Upload / Replace dropzone toggle (Investor Mode) */}
      {showUploadControl && (
        <UploadControl
          documentId={id}
          documentTitle={title}
          isReplacement={isReplacing}
          onFileSelected={handleUploadSubmit}
          onCancel={handleCancelUpload}
        />
      )}

      {/* Rejection Alert Callout if Rejected */}
      {status === 'Rejected' && rejectionReason && (
        <div className="rejection-alert" role="alert">
          <FiAlertTriangle className="rejection-icon" aria-hidden="true" />
          <div className="rejection-text-wrap">
            <h4 className="rejection-title">Reviewer Rejection Reason</h4>
            <p className="rejection-reason-text">{rejectionReason}</p>
          </div>
        </div>
      )}

      {/* Actions Row / Column 4 */}
      <div className="card-actions-row">
        {mode === 'investor' ? (
          // ================= INVESTOR MODE ACTIONS =================
          <>
            {/* Status: Pending -> show Upload button */}
            {status === 'Pending' && !showUploadControl && (
              <button
                type="button"
                className="card-btn btn-primary"
                onClick={() => handleStartUpload(false)}
              >
                <FiUploadCloud aria-hidden="true" />
                <span>Upload Document</span>
              </button>
            )}

            {/* Status: Uploaded -> Preview, Replace, Remove */}
            {status === 'Uploaded' && !showUploadControl && (
              <>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => onPreview(document)}
                  title="Preview document"
                >
                  <FiEye aria-hidden="true" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => handleStartUpload(true)}
                  title="Replace uploaded document"
                >
                  <FiRefreshCw aria-hidden="true" />
                  <span>Replace</span>
                </button>
                <button
                  type="button"
                  className="card-btn btn-danger-outline"
                  onClick={() => onRequestRemove(document)}
                  title="Remove document"
                >
                  <FiTrash2 aria-hidden="true" />
                  <span>Remove</span>
                </button>
              </>
            )}

            {/* Status: Under Review -> Preview & info */}
            {status === 'Under Review' && (
              <>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => onPreview(document)}
                >
                  <FiEye aria-hidden="true" />
                  <span>Preview</span>
                </button>
                <span className="card-status-info">
                  Locked while reviewer inspection is in progress.
                </span>
              </>
            )}

            {/* Status: Verified -> Preview & locked */}
            {status === 'Verified' && (
              <>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => onPreview(document)}
                >
                  <FiEye aria-hidden="true" />
                  <span>Preview</span>
                </button>
                <span className="card-status-info" style={{ color: '#16a34a', fontWeight: 600 }}>
                  <FiCheckCircle aria-hidden="true" /> Verified &amp; Accepted
                </span>
              </>
            )}

            {/* Status: Rejected -> Replace / Re-upload */}
            {status === 'Rejected' && !showUploadControl && (
              <>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => onPreview(document)}
                  title="Preview rejected copy"
                >
                  <FiEye aria-hidden="true" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  className="card-btn btn-primary"
                  onClick={() => handleStartUpload(true)}
                >
                  <FiRefreshCw aria-hidden="true" />
                  <span>Re-upload Corrected File</span>
                </button>
              </>
            )}
          </>
        ) : (
          // ================= REVIEWER MODE ACTIONS =================
          <>
            {/* Status: Pending -> Dedicated styled indicator */}
            {status === 'Pending' && (
              <div className="reviewer-pending-action-chip">
                <FiClock aria-hidden="true" />
                <span>Pending Investor Action</span>
              </div>
            )}

            {/* Status: Uploaded -> Start Review */}
            {status === 'Uploaded' && (
              <>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => onPreview(document)}
                >
                  <FiEye aria-hidden="true" />
                  <span>Inspect</span>
                </button>
                <button
                  type="button"
                  className="card-btn btn-review"
                  onClick={() => onStartReview(id)}
                >
                  <FiPlay aria-hidden="true" />
                  <span>Start Review</span>
                </button>
              </>
            )}

            {/* Status: Under Review -> Verify or Reject */}
            {status === 'Under Review' && (
              <>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => onPreview(document)}
                >
                  <FiEye aria-hidden="true" />
                  <span>Inspect</span>
                </button>
                <button
                  type="button"
                  className="card-btn btn-success"
                  onClick={() => onVerify(id)}
                >
                  <FiCheckCircle aria-hidden="true" />
                  <span>Verify</span>
                </button>
                <button
                  type="button"
                  className="card-btn btn-danger"
                  onClick={() => onRequestReject(document)}
                >
                  <FiXCircle aria-hidden="true" />
                  <span>Reject</span>
                </button>
              </>
            )}

            {/* Status: Verified */}
            {status === 'Verified' && (
              <>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => onPreview(document)}
                >
                  <FiEye aria-hidden="true" />
                  <span>Inspect</span>
                </button>
                <span className="card-status-info" style={{ color: '#16a34a', fontWeight: 600 }}>
                  <FiCheckCircle aria-hidden="true" /> Verified
                </span>
              </>
            )}

            {/* Status: Rejected */}
            {status === 'Rejected' && (
              <>
                <button
                  type="button"
                  className="card-btn btn-secondary"
                  onClick={() => onPreview(document)}
                >
                  <FiEye aria-hidden="true" />
                  <span>Inspect</span>
                </button>
                <span className="card-status-info" style={{ color: '#dc2626', fontWeight: 600 }}>
                  <FiXCircle aria-hidden="true" /> Awaiting Fix
                </span>
              </>
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default DocumentCard;
