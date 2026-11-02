/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/ConfirmModal.jsx
 * 
 * Reusable modal dialog for verifying critical user actions such as
 * document removal or status reversal, with keyboard accessibility (Escape to close).
 */

import React, { useEffect } from 'react';
import { FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import '../Styles/Components/confirmModal.css';

const ConfirmModal = ({
  isOpen,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' | 'warning' | 'info'
  onConfirm,
  onCancel
}) => {
  // Listen for Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dialog-title"
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <div className={`modal-icon-badge ${type}`} aria-hidden="true">
              {type === 'danger' || type === 'warning' ? (
                <FiAlertTriangle />
              ) : (
                <FiInfo />
              )}
            </div>
            <h3 id="modal-dialog-title" className="modal-title">
              {title}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Close modal dialog"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="modal-btn modal-btn-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`modal-btn modal-btn-confirm ${type === 'danger' ? 'danger' : 'primary'}`}
            onClick={onConfirm}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
