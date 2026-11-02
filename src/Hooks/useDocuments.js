/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Hooks/useDocuments.js
 * 
 * Custom hook to manage documents state, workflow state transitions,
 * document replacement, removal, reviewer verification, and statistics.
 */

import { useState, useCallback, useMemo } from 'react';
import { initialMockDocuments } from '../Data/mockDocuments.js';
import { calculateStats } from '../Utils/documentHelpers.js';
import { revokeBlobUrlSafely } from './useObjectUrl.js';

export const useDocuments = (initialData = initialMockDocuments) => {
  const [documents, setDocuments] = useState(initialData);
  const [actionNotification, setActionNotification] = useState(null);

  // Helper to trigger temporary toast / feedback messages
  const notify = useCallback((message, type = 'success') => {
    setActionNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setActionNotification(null);
    }, 4500);
  }, []);

  const clearNotification = useCallback(() => {
    setActionNotification(null);
  }, []);

  /**
   * Upload a new file for a document in Pending state.
   * Creates an object URL and sets status to 'Uploaded'.
   */
  const uploadDocument = useCallback((docId, file) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const now = new Date().toISOString();

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId) {
          // If previous document had an object URL, revoke it
          if (doc.previewUrl) {
            revokeBlobUrlSafely(doc.previewUrl);
          }
          return {
            ...doc,
            status: 'Uploaded',
            fileName: file.name,
            fileType: file.type || 'application/octet-stream',
            fileSize: file.size,
            selectedAt: now,
            rejectionReason: null,
            file,
            previewUrl
          };
        }
        return doc;
      })
    );

    notify(`"${file.name}" uploaded successfully! Status is now Uploaded.`, 'success');
  }, [notify]);

  /**
   * Replace an existing or rejected document with a new file.
   * Status resets to 'Uploaded' for a fresh review cycle.
   */
  const replaceDocument = useCallback((docId, file) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const now = new Date().toISOString();

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId) {
          if (doc.previewUrl) {
            revokeBlobUrlSafely(doc.previewUrl);
          }
          return {
            ...doc,
            status: 'Uploaded',
            fileName: file.name,
            fileType: file.type || 'application/octet-stream',
            fileSize: file.size,
            selectedAt: now,
            rejectionReason: null, // Clear past rejection note
            file,
            previewUrl
          };
        }
        return doc;
      })
    );

    notify(`Document replaced with "${file.name}". Ready for reviewer evaluation.`, 'info');
  }, [notify]);

  /**
   * Remove an uploaded document and revert its status back to Pending.
   */
  const removeDocument = useCallback((docId) => {
    let docTitle = 'Document';

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId) {
          docTitle = doc.title;
          if (doc.previewUrl) {
            revokeBlobUrlSafely(doc.previewUrl);
          }
          return {
            ...doc,
            status: 'Pending',
            fileName: null,
            fileType: null,
            fileSize: null,
            selectedAt: null,
            rejectionReason: null,
            file: null,
            previewUrl: null
          };
        }
        return doc;
      })
    );

    notify(`"${docTitle}" has been removed and reset to Pending.`, 'warning');
  }, [notify]);

  /**
   * Reviewer starts evaluation of an Uploaded document.
   * Workflow: Uploaded -> Under Review
   */
  const startReview = useCallback((docId) => {
    let docTitle = 'Document';

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId && doc.status === 'Uploaded') {
          docTitle = doc.title;
          return {
            ...doc,
            status: 'Under Review'
          };
        }
        return doc;
      })
    );

    notify(`Review initiated for "${docTitle}". Status changed to Under Review.`, 'info');
  }, [notify]);

  /**
   * Reviewer marks an Under Review document as Verified.
   * Workflow: Under Review -> Verified
   */
  const verifyDocument = useCallback((docId) => {
    let docTitle = 'Document';

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId && doc.status === 'Under Review') {
          docTitle = doc.title;
          return {
            ...doc,
            status: 'Verified',
            rejectionReason: null
          };
        }
        return doc;
      })
    );

    notify(`"${docTitle}" verified successfully! Marked as Verified.`, 'success');
  }, [notify]);

  /**
   * Reviewer rejects an Under Review document with mandatory reason.
   * Workflow: Under Review -> Rejected
   */
  const rejectDocument = useCallback((docId, reason) => {
    if (!reason || !reason.trim()) {
      notify('Rejection requires an explanatory reason.', 'error');
      return false;
    }

    let docTitle = 'Document';

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId && doc.status === 'Under Review') {
          docTitle = doc.title;
          return {
            ...doc,
            status: 'Rejected',
            rejectionReason: reason.trim()
          };
        }
        return doc;
      })
    );

    notify(`"${docTitle}" was rejected. The investor has been notified with your reason.`, 'error');
    return true;
  }, [notify]);

  /**
   * Reset all documents to initial mock state.
   */
  const resetToMockData = useCallback(() => {
    // Revoke any created blobs in state
    documents.forEach((doc) => {
      if (doc.previewUrl) {
        revokeBlobUrlSafely(doc.previewUrl);
      }
    });

    setDocuments(initialMockDocuments);
    notify('Reset all document data to initial demo state.', 'info');
  }, [documents, notify]);

  // Derived statistics using pure calculation (no unnecessary useEffect)
  const stats = useMemo(() => calculateStats(documents), [documents]);

  return {
    documents,
    stats,
    actionNotification,
    clearNotification,
    uploadDocument,
    replaceDocument,
    removeDocument,
    startReview,
    verifyDocument,
    rejectDocument,
    resetToMockData
  };
};

export default useDocuments;
