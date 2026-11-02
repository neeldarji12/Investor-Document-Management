/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/UploadControl.jsx
 * 
 * Secure file upload component featuring drag-and-drop, strict client-side validation
 * (PDF/JPG/PNG, max 5MB), simulated progress bar animation, and clear error feedback.
 */

import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiFile, FiAlertCircle } from 'react-icons/fi';
import { validateFile, formatFileSize } from '../Utils/fileValidation.js';
import '../Styles/Components/uploadControl.css';

const UploadControl = ({
  documentId,
  documentTitle,
  isReplacement = false,
  onFileSelected,
  onCancel
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null); // null or number 0-100
  const [selectedFileMeta, setSelectedFileMeta] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file validation and simulated upload progress
  const processFile = (file) => {
    if (!file) return;

    // 1. Validate file format and size limits
    const validation = validateFile(file);
    if (!validation.isValid) {
      setErrorMessage(validation.error);
      return;
    }

    setErrorMessage(null);
    setSelectedFileMeta({
      name: file.name,
      size: formatFileSize(file.size)
    });

    // 2. Simulate upload progress (0% -> 100%)
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(100);
            setTimeout(() => {
              // Complete upload and inform parent
              onFileSelected(file);
              setUploadProgress(null);
              setSelectedFileMeta(null);
            }, 250);
          }, 150);
          return 90;
        }
        return prev + 25;
      });
    }, 120);
  };

  // Drag and drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };

  // Click file picker trigger
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const chosenFile = e.target.files[0];
      processFile(chosenFile);
    }
  };

  const triggerPicker = () => {
    if (uploadProgress === null && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload-control">
      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        id={`file-input-${documentId}`}
        className="hidden-file-input"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileInputChange}
      />

      {uploadProgress !== null ? (
        // Progress display during upload
        <div className="upload-progress-wrapper" role="status" aria-live="polite">
          <div className="progress-header">
            <div className="progress-file-info">
              <FiFile aria-hidden="true" />
              <span>{selectedFileMeta?.name} ({selectedFileMeta?.size})</span>
            </div>
            <span>{uploadProgress}%</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="progress-status-caption">
            {uploadProgress < 100 ? 'Encrypting & uploading document...' : 'Finalizing upload...'}
          </div>
        </div>
      ) : (
        // Dropzone
        <div
          className={`upload-dropzone ${isDragActive ? 'drag-active' : ''} ${errorMessage ? 'has-error' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerPicker}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && triggerPicker()}
          aria-label={`Upload file for ${documentTitle}`}
        >
          <FiUploadCloud className="upload-icon" aria-hidden="true" />
          <p className="upload-prompt-text">
            <span>{isReplacement ? 'Choose replacement file' : 'Click to browse'}</span> or drag & drop here
          </p>
          <p className="upload-hint-text">
            Accepted formats: PDF, JPG, PNG • Max size: 5 MB
          </p>
          {onCancel && (
            <button
              type="button"
              className="btn-cancel-upload"
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '0.75rem',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginTop: '4px'
              }}
            >
              Cancel upload
            </button>
          )}
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="upload-error-message" role="alert">
          <FiAlertCircle aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UploadControl;
