/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/StatusBadge.jsx
 * 
 * Reusable status indicator badge supporting:
 * Pending, Uploaded, Under Review, Verified, and Rejected states
 * with distinct color palettes, borders, and iconography.
 */

import React from 'react';
import { 
  FiClock, 
  FiUploadCloud, 
  FiEye, 
  FiCheckCircle, 
  FiAlertTriangle 
} from 'react-icons/fi';
import { getStatusConfig } from '../Utils/documentHelpers.js';
import '../Styles/Components/statusBadge.css';

const StatusBadge = ({ status, size = 'sm' }) => {
  const { className, label } = getStatusConfig(status);

  const renderIcon = () => {
    switch (status) {
      case 'Verified':
        return <FiCheckCircle className="status-badge-icon" aria-hidden="true" />;
      case 'Under Review':
        return <FiEye className="status-badge-icon" aria-hidden="true" />;
      case 'Uploaded':
        return <FiUploadCloud className="status-badge-icon" aria-hidden="true" />;
      case 'Rejected':
        return <FiAlertTriangle className="status-badge-icon" aria-hidden="true" />;
      case 'Pending':
      default:
        return <FiClock className="status-badge-icon" aria-hidden="true" />;
    }
  };

  return (
    <span 
      className={`status-badge ${className} ${size === 'lg' ? 'badge-lg' : ''}`}
      role="status"
      aria-label={`Status: ${label}`}
    >
      {renderIcon()}
      <span>{label}</span>
    </span>
  );
};

export default StatusBadge;
