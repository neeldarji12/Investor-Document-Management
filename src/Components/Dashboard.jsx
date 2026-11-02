/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/Dashboard.jsx
 * 
 * Institutional investment-style dashboard overview displaying welcome greeting,
 * investor account metadata, KYC compliance progress, and 4 clean summary metric cards.
 */

import React from 'react';
import { 
  FiFileText, 
  FiClock, 
  FiUploadCloud, 
  FiCheckCircle, 
  FiShield, 
  FiAward 
} from 'react-icons/fi';
import '../Styles/Components/dashboard.css';

const Dashboard = ({
  title = 'Document Management',
  subtitle = 'Manage your official onboarding documentation, track verification milestones, and fulfill compliance criteria.',
  pretitle = 'Applen Solutions Investor Portal',
  stats = { total: 0, pending: 0, uploaded: 0, verified: 0 }
}) => {
  const { total, pending, uploaded, verified } = stats;

  // Calculate percentage of documents verified
  const completionPercentage = total > 0 ? Math.round((verified / total) * 100) : 0;
  const isReviewerMode = pretitle.toLowerCase().includes('compliance') || title.toLowerCase().includes('reviewer');

  return (
    <section className="dashboard-hero" aria-label="Portal Statistics Overview">
      <div className="dashboard-hero-content">
        {/* Top Header & Investor Greeting */}
        <div className="hero-header">
          <div className="hero-titles">
            <div className="hero-pretitle-row">
              <span className="hero-pretitle">{pretitle}</span>
              <span className="hero-account-badge">
                <FiShield aria-hidden="true" />
                {isReviewerMode ? 'SEC / FINRA Audit Mode' : 'Account #DJ-7729-LP • Series A Fund'}
              </span>
            </div>
            
            <h1 className="hero-title">
              {isReviewerMode ? 'Compliance Verification Desk' : 'Welcome back, David Jenkins'}
            </h1>
            
            <p className="hero-subtitle">{subtitle}</p>
          </div>

          {/* Compliance Progress Card */}
          <div className="verification-progress-card" aria-label={`KYC Compliance: ${completionPercentage}%`}>
            <div className="progress-label-row">
              <span className="progress-title">
                <FiAward aria-hidden="true" />
                {isReviewerMode ? 'Fund Compliance Score' : 'KYC Verification Progress'}
              </span>
              <span className="progress-percentage-value">{completionPercentage}%</span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin="0" aria-valuemax="100">
              <div 
                className="progress-indicator" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="progress-caption">
              <span>{verified} of {total} documents certified</span>
              <span className="progress-status-chip">
                {completionPercentage === 100 ? 'Fully Certified' : 'In Compliance'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Professional Financial Summary Cards */}
        <div className="summary-cards-grid">
          {/* 1. Total Documents */}
          <div className="summary-card card-total">
            <div className="summary-card-inner">
              <div className="summary-card-text">
                <span className="summary-label">Total Portfolio Documents</span>
                <span className="summary-count">{total}</span>
                <span className="summary-hint">Required for complete KYC</span>
              </div>
              <div className="summary-icon-wrapper" aria-hidden="true">
                <FiFileText />
              </div>
            </div>
            <div className="summary-card-accent accent-navy"></div>
          </div>

          {/* 2. Pending Documents */}
          <div className={`summary-card card-pending ${isReviewerMode ? 'reviewer-pending-stat-card' : ''}`}>
            <div className="summary-card-inner">
              <div className="summary-card-text">
                <span className="summary-label">
                  {isReviewerMode ? 'Pending Investor Uploads' : 'Pending Submission'}
                </span>
                <span className="summary-count">{pending}</span>
                <span className="summary-hint">
                  {isReviewerMode ? 'Awaiting investor action & files' : 'Awaiting investor upload'}
                </span>
              </div>
              <div className="summary-icon-wrapper" aria-hidden="true">
                <FiClock />
              </div>
            </div>
            <div className="summary-card-accent accent-amber"></div>
          </div>

          {/* 3. Uploaded Documents */}
          <div className="summary-card card-uploaded">
            <div className="summary-card-inner">
              <div className="summary-card-text">
                <span className="summary-label">Uploaded / Queued</span>
                <span className="summary-count">{uploaded}</span>
                <span className="summary-hint">Under compliance inspection</span>
              </div>
              <div className="summary-icon-wrapper" aria-hidden="true">
                <FiUploadCloud />
              </div>
            </div>
            <div className="summary-card-accent accent-blue"></div>
          </div>

          {/* 4. Verified Documents */}
          <div className="summary-card card-verified">
            <div className="summary-card-inner">
              <div className="summary-card-text">
                <span className="summary-label">Verified &amp; Certified</span>
                <span className="summary-count">{verified}</span>
                <span className="summary-hint">Formally approved by legal</span>
              </div>
              <div className="summary-icon-wrapper" aria-hidden="true">
                <FiCheckCircle />
              </div>
            </div>
            <div className="summary-card-accent accent-green"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
