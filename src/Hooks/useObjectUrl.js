/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Hooks/useObjectUrl.js
 * 
 * Custom hook to manage lifecycle of browser Object URLs (URL.createObjectURL).
 * Automatically revokes previous URLs on file changes and cleans up on unmount
 * to prevent browser memory leaks.
 */

import { useState, useEffect, useRef } from 'react';

/**
 * Safely revokes an object URL if it is a blob protocol URL.
 * @param {string|null} url
 */
export const revokeBlobUrlSafely = (url) => {
  if (url && typeof url === 'string' && url.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('Revoke error:', e);
    }
  }
};

/**
 * Custom hook that creates an object URL for a given File/Blob and guarantees cleanup.
 * @param {File|Blob|string|null} fileOrUrl - Either a File/Blob, an existing URL string, or null.
 * @returns {string|null} The object URL string or existing string URL.
 */
export const useObjectUrl = (fileOrUrl) => {
  const [objectUrl, setObjectUrl] = useState(null);
  const previousUrlRef = useRef(null);

  useEffect(() => {
    let activeUrl = null;

    if (fileOrUrl) {
      if (typeof fileOrUrl === 'string') {
        activeUrl = fileOrUrl;
      } else if (fileOrUrl instanceof Blob || fileOrUrl instanceof File) {
        try {
          activeUrl = URL.createObjectURL(fileOrUrl);
        } catch (err) {
          console.error('Error creating object URL:', err);
        }
      }
    }

    // Revoke previous URL if it was a blob URL
    if (previousUrlRef.current && previousUrlRef.current !== activeUrl) {
      revokeBlobUrlSafely(previousUrlRef.current);
    }

    previousUrlRef.current = activeUrl;
    
    // Defer state update to avoid synchronous render cascade in React 19
    const frameId = requestAnimationFrame(() => {
      setObjectUrl(activeUrl);
    });

    return () => {
      cancelAnimationFrame(frameId);
      if (activeUrl) {
        revokeBlobUrlSafely(activeUrl);
      }
    };
  }, [fileOrUrl]);

  return objectUrl;
};

export default useObjectUrl;
