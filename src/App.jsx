/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/App.jsx
 * 
 * Master Application Shell with React Router DOM:
 * - Route: / -> Home (Landing Page)
 * - Route: /documents -> InvestorDashboard (Documents & KYC)
 * - Route: /holdings -> Holdings (Asset Allocation & Portfolio NAV)
 * - Route: /capital-calls -> CapitalCalls (Drawdowns & Wire Notices)
 * - Route: /reviewer -> ReviewerDashboard (Compliance Audit Desk)
 */

import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './Pages/Home.jsx';
import InvestorDashboard from './Pages/InvestorDashboard.jsx';
import ReviewerDashboard from './Pages/ReviewerDashboard.jsx';
import Holdings from './Pages/Holdings.jsx';
import CapitalCalls from './Pages/CapitalCalls.jsx';
import { useDocuments } from './Hooks/useDocuments.js';
import { 
  FiShield, 
  FiLock, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiChevronRight
} from 'react-icons/fi';
import './App.css';

const CURRENT_YEAR = 2026;

function App() {
  // Master document state & audit workflow methods from custom hook
  const {
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
  } = useDocuments();

  // Count items awaiting compliance audit (Uploaded + Under Review)
  const pendingReviewerCount = stats.uploaded + stats.underReview;

  return (
    <div className="app-container">
      {/* Universal Institutional Navbar with React Router NavLinks */}
      <Navbar
        pendingReviewCount={pendingReviewerCount}
        onResetData={resetToMockData}
      />

      {/* Main Routed Views */}
      <div className="app-main">
        <Routes>
          {/* Main Landing Home Page */}
          <Route path="/" element={<Home />} />

          {/* Investor Mode -> Documents & KYC Checklist */}
          <Route
            path="/documents"
            element={
              <InvestorDashboard
                documents={documents}
                stats={stats}
                actionNotification={actionNotification}
                onClearNotification={clearNotification}
                onUploadDocument={uploadDocument}
                onReplaceDocument={replaceDocument}
                onRemoveDocument={removeDocument}
              />
            }
          />

          {/* Holdings & Asset Allocation */}
          <Route path="/holdings" element={<Holdings />} />

          {/* Capital Calls & Drawdown Schedule */}
          <Route path="/capital-calls" element={<CapitalCalls />} />

          {/* Reviewer Mode -> Compliance Verification Desk */}
          <Route
            path="/reviewer"
            element={
              <ReviewerDashboard
                documents={documents}
                stats={stats}
                actionNotification={actionNotification}
                onClearNotification={clearNotification}
                onStartReview={startReview}
                onVerifyDocument={verifyDocument}
                onRejectDocument={rejectDocument}
              />
            }
          />

          {/* Catch-all fallback: redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Portal Global Institutional Footer */}
      <footer className="app-footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-top-grid">
            {/* Column 1: Branding & Description */}
            <div className="footer-brand-col">
              <Link to="/" className="footer-brand-header">
                <div className="footer-logo-icon" aria-hidden="true">
                  <span className="footer-logo-monogram">DJ</span>
                </div>
                <div>
                  <div className="footer-brand-title">APPLEN SOLUTIONS</div>
                  <div className="footer-brand-subtitle">DJ INVESTOR PORTAL</div>
                </div>
              </Link>
              <p className="footer-brand-desc">
                Institutional-grade wealth management and document compliance infrastructure for accredited limited partners, family offices, and fund managers.
              </p>
              <div className="footer-badges">
                <span className="security-badge">
                  <FiShield aria-hidden="true" />
                  <span>256-Bit SSL Client Encryption</span>
                </span>
                <span className="security-badge" style={{ color: '#475569' }}>
                  <FiLock aria-hidden="true" />
                  <span>KYC / AML Compliant</span>
                </span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Portal Navigation</h4>
              <ul className="footer-nav-list">
                <li>
                  <Link to="/" className="footer-nav-link">
                    <FiChevronRight aria-hidden="true" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/documents" className="footer-nav-link">
                    <FiChevronRight aria-hidden="true" />
                    <span>Documents &amp; KYC</span>
                  </Link>
                </li>
                <li>
                  <Link to="/holdings" className="footer-nav-link">
                    <FiChevronRight aria-hidden="true" />
                    <span>Portfolio Holdings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/capital-calls" className="footer-nav-link">
                    <FiChevronRight aria-hidden="true" />
                    <span>Capital Calls</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reviewer" className="footer-nav-link">
                    <FiChevronRight aria-hidden="true" />
                    <span>Compliance Review Desk</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Information Placeholder */}
            <div className="footer-contact-col">
              <h4 className="footer-col-title">Investor Relations &amp; Inquiries</h4>
              <p className="footer-contact-text">
                Direct assistance for LP onboarding, compliance verification, and wire drawdown notices.
              </p>
              <div className="footer-contact-details">
                <div className="contact-item">
                  <FiMail aria-hidden="true" />
                  <span>investor-relations@applen-solutions.demo</span>
                </div>
                <div className="contact-item">
                  <FiPhone aria-hidden="true" />
                  <span>+1 (800) 555-APPLEN (Toll-Free Desk)</span>
                </div>
                <div className="contact-item">
                  <FiMapPin aria-hidden="true" />
                  <span>100 Financial District Blvd, Suite 4200, New York, NY</span>
                </div>
                <div className="contact-item">
                  <FiClock aria-hidden="true" />
                  <span>Desk Hours: Mon–Fri, 08:00–18:00 EST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Compliance */}
          <div className="footer-bottom-bar">
            <div className="footer-copyright">
              &copy; {CURRENT_YEAR} APPLEN SOLUTIONS Inc. All rights reserved. DJ Investor Portal is a private, confidential LP communications system.
            </div>
            <div className="footer-disclaimers">
              <span>Confidential &amp; Proprietary</span>
              <span className="footer-dot">•</span>
              <span>Tier-1 Accredited Portal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
