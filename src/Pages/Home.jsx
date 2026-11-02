/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Pages/Home.jsx
 * 
 * Institutional Home / Landing Page
 * - Full-width Hero section with financial visual & dual CTAs (id="home")
 * - Investment Overview (Document Management, Portfolio Overview, Capital Calls)
 * - About Us & Portal Advantages (id="about")
 * - How It Works (4-Step Onboarding Journey)
 * - Contact Our Institutional Desk (id="contact")
 * - Final Call to Action (CTA) leading to Investor Dashboard
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiFileText,
  FiPieChart,
  FiDollarSign,
  FiLock,
  FiTrendingUp,
  FiEye,
  FiActivity,
  FiLayers,
  FiCompass,
  FiDatabase,
  FiAward,
  FiCheckSquare,
  FiUploadCloud,
  FiUserCheck,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiClock,
  FiMapPin
} from 'react-icons/fi';
import '../Styles/Pages/home.css';

const Home = () => {
  const navigate = useNavigate();

  // Smooth scroll handler for "View Investment Services"
  const handleScrollToServices = () => {
    const section = document.getElementById('services');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="home-page">
      {/* ==================================================================
          SECTION 1: HERO SECTION (id="home")
          ================================================================== */}
      <section id="home" className="home-hero" aria-label="Welcome to DJ Investor Portal">
        <div className="hero-container">
          {/* Left Column: Messaging & CTAs */}
          <div className="hero-content">
            <div className="hero-badge">
              <FiShield className="badge-icon" aria-hidden="true" />
              <span>APPLEN SOLUTIONS | INVESTOR SERVICES</span>
            </div>

            <h1 className="hero-title">
              Your Investments. <br />
              Your Documents. <br />
              <span className="hero-title-accent">Your Control.</span>
            </h1>

            <p className="hero-lead">
              Manage your investment documentation, monitor portfolio information, and stay informed through one secure investor portal.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => navigate('/documents')}
                aria-label="Explore Investor Portal"
              >
                <span>Explore Investor Portal</span>
                <FiArrowRight aria-hidden="true" />
              </button>

              <button
                type="button"
                className="btn-hero-secondary"
                onClick={handleScrollToServices}
                aria-label="View Investment Services"
              >
                <FiLayers aria-hidden="true" />
                <span>View Investment Services</span>
              </button>
            </div>

            {/* Small Trust Indicators */}
            <div className="hero-trust-indicators" aria-label="Trust and Security Badges">
              <div className="trust-indicator-item">
                <FiLock aria-hidden="true" />
                <span>Secure Document Management</span>
              </div>
              <div className="trust-indicator-item">
                <FiAward aria-hidden="true" />
                <span>Investor-focused Services</span>
              </div>
              <div className="trust-indicator-item">
                <FiActivity aria-hidden="true" />
                <span>Transparent Information</span>
              </div>
            </div>
          </div>

          {/* Right Column: Financial-Themed Institutional Visual */}
          <div className="hero-visual-wrapper">
            <div className="hero-dashboard-mock" role="region" aria-label="Simulated Investor Dashboard Preview">
              {/* Top Status Bar */}
              <div className="mock-top-bar">
                <div className="mock-live-indicator">
                  <span className="live-pulse-dot" aria-hidden="true"></span>
                  <span className="live-label">LIVE COMPLIANCE VAULT</span>
                </div>
                <span className="mock-tier-badge">TIER-1 ACCREDITED LP</span>
              </div>

              {/* Header Financial Split */}
              <div className="mock-financial-summary">
                <div className="mock-metric-main">
                  <span className="mock-label">TOTAL PORTFOLIO NAV</span>
                  <div className="mock-val-row">
                    <span className="mock-big-num">$18,450,000</span>
                    <span className="mock-gain-badge">+18.4% YoY</span>
                  </div>
                </div>
                <div className="mock-sub-stats">
                  <div className="mock-stat-item">
                    <span className="stat-label">Committed Capital</span>
                    <span className="stat-val">$25,000,000</span>
                  </div>
                  <div className="mock-stat-item">
                    <span className="stat-label">Current Drawdowns</span>
                    <span className="stat-val">$18,750,000</span>
                  </div>
                </div>
              </div>

              {/* KYC Progress Snapshot */}
              <div className="mock-progress-box">
                <div className="progress-header">
                  <span className="progress-title">Document KYC Readiness</span>
                  <span className="progress-pct">87.5% Verified</span>
                </div>
                <div className="progress-track" role="progressbar" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-fill" style={{ width: '87.5%' }}></div>
                </div>
              </div>

              {/* Micro Document Feed */}
              <div className="mock-doc-feed" aria-label="Recent Document Statuses">
                <div className="feed-item">
                  <div className="feed-doc-info">
                    <FiFileText className="feed-icon verified" aria-hidden="true" />
                    <div>
                      <div className="feed-name">PAN Card Verification</div>
                      <div className="feed-sub">Tax Identifier • Verified by Compliance</div>
                    </div>
                  </div>
                  <span className="feed-badge verified">Verified</span>
                </div>

                <div className="feed-item">
                  <div className="feed-doc-info">
                    <FiFileText className="feed-icon review" aria-hidden="true" />
                    <div>
                      <div className="feed-name">Bank Statement (Q1)</div>
                      <div className="feed-sub">Financial Proof • Officer Audit Active</div>
                    </div>
                  </div>
                  <span className="feed-badge review">Under Review</span>
                </div>

                <div className="feed-item">
                  <div className="feed-doc-info">
                    <FiFileText className="feed-icon verified" aria-hidden="true" />
                    <div>
                      <div className="feed-name">Aadhaar National ID</div>
                      <div className="feed-sub">Biometric Proof • Tier-1 Cleared</div>
                    </div>
                  </div>
                  <span className="feed-badge verified">Verified</span>
                </div>
              </div>

              {/* Floating Highlight 1: Capital Call Settled */}
              <div className="floating-highlight-badge highlight-top" aria-hidden="true">
                <div className="floating-icon-wrap green">
                  <FiCheckCircle />
                </div>
                <div>
                  <div className="floating-title">Capital Call #04 Settled</div>
                  <div className="floating-subtitle">$1,250,000 Wire Received</div>
                </div>
              </div>

              {/* Floating Highlight 2: Fund Return Metrics */}
              <div className="floating-highlight-badge highlight-bottom" aria-hidden="true">
                <div className="floating-icon-wrap gold">
                  <FiTrendingUp />
                </div>
                <div>
                  <div className="floating-title">Fund Net MOIC: 2.15x</div>
                  <div className="floating-subtitle">Net IRR: 24.6% (Series A)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 2: INVESTMENT OVERVIEW (SERVICES)
          ================================================================== */}
      <section id="services" className="home-section services-section" aria-label="Investment Services Overview">
        <div className="home-section-container">
          <div className="section-header">
            <span className="section-tag">COMPREHENSIVE INVESTOR SERVICES</span>
            <h2 className="section-title">Your Investment Journey, Simplified</h2>
            <p className="section-desc">
              Institutional-grade wealth infrastructure designed to streamline regulatory document compliance, asset reporting, and capital calls.
            </p>
          </div>

          <div className="services-grid">
            {/* Card 1: Document Management */}
            <div className="service-card">
              <div className="service-card-header">
                <div className="service-icon-box">
                  <FiFileText aria-hidden="true" />
                </div>
                <span className="service-card-tag">KYC &amp; COMPLIANCE</span>
              </div>
              <h3 className="service-card-title">Document Management</h3>
              <p className="service-card-lead">
                Ensure regulatory compliance with a frictionless, role-separated submission and audit workflow.
              </p>
              <ul className="service-card-list">
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>Upload and manage KYC documents.</span>
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>Track verification status in real time.</span>
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>Maintain document information securely.</span>
                </li>
              </ul>
              <div className="service-card-footer">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => navigate('/documents')}
                >
                  <span>Access Document Checklist</span>
                  <FiChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Card 2: Portfolio Overview */}
            <div className="service-card">
              <div className="service-card-header">
                <div className="service-icon-box">
                  <FiPieChart aria-hidden="true" />
                </div>
                <span className="service-card-tag">ASSET ALLOCATION</span>
              </div>
              <h3 className="service-card-title">Portfolio Overview</h3>
              <p className="service-card-lead">
                Full transparency into fund valuations, capital deployment, and asset performance metrics.
              </p>
              <ul className="service-card-list">
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>View investment-related information.</span>
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>Monitor portfolio details and net asset valuations.</span>
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>Access investment summaries, MOIC, and IRR data.</span>
                </li>
              </ul>
              <div className="service-card-footer">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => navigate('/holdings')}
                >
                  <span>View Portfolio Holdings</span>
                  <FiChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Card 3: Capital Call Updates */}
            <div className="service-card">
              <div className="service-card-header">
                <div className="service-icon-box">
                  <FiDollarSign aria-hidden="true" />
                </div>
                <span className="service-card-tag">DRAWDOWNS &amp; WIRE</span>
              </div>
              <h3 className="service-card-title">Capital Call Updates</h3>
              <p className="service-card-lead">
                Stay current on fund capital requirements, wire transfer notices, and uncalled commitments.
              </p>
              <ul className="service-card-list">
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>Review capital call information.</span>
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>Track payment-related updates and settlement proofs.</span>
                </li>
                <li>
                  <FiCheckCircle aria-hidden="true" />
                  <span>Stay informed about upcoming investment requirements.</span>
                </li>
              </ul>
              <div className="service-card-footer">
                <button
                  type="button"
                  className="card-action-btn"
                  onClick={() => navigate('/capital-calls')}
                >
                  <span>Review Capital Notices</span>
                  <FiChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 3: ABOUT US & WHY CHOOSE OUR INVESTOR PORTAL (id="about")
          ================================================================== */}
      <section id="about" className="home-section benefits-section" aria-label="About Us and Portal Advantages">
        <div className="home-section-container">
          <div className="section-header">
            <span className="section-tag">ABOUT APPLEN SOLUTIONS</span>
            <h2 className="section-title">Why Choose Our Investor Portal?</h2>
            <p className="section-desc">
              Engineered specifically for accredited investors, family offices, and institutional fund managers who require precision, security, and velocity in document management.
            </p>
          </div>

          <div className="benefits-grid">
            {/* Benefit 1 */}
            <div className="benefit-card">
              <div className="benefit-icon-pill">
                <FiLock aria-hidden="true" />
              </div>
              <h3 className="benefit-card-title">Secure Document Workflow</h3>
              <p className="benefit-card-text">
                Bank-grade client-side encryption and strict access boundaries ensure your sensitive identity and financial proofs remain fully protected.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="benefit-card">
              <div className="benefit-icon-pill">
                <FiEye aria-hidden="true" />
              </div>
              <h3 className="benefit-card-title">Transparent Information</h3>
              <p className="benefit-card-text">
                Real-time compliance status transitions, audit reasoning timestamps, and comprehensive portfolio disclosures with zero ambiguity.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="benefit-card">
              <div className="benefit-icon-pill">
                <FiCompass aria-hidden="true" />
              </div>
              <h3 className="benefit-card-title">Easy Investor Access</h3>
              <p className="benefit-card-text">
                A streamlined single-portal workspace allowing frictionless document upload, instant in-browser previews, and swift communication.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="benefit-card">
              <div className="benefit-icon-pill">
                <FiDatabase aria-hidden="true" />
              </div>
              <h3 className="benefit-card-title">Organized Investment Records</h3>
              <p className="benefit-card-text">
                Centralized digital repository categorizing identity, financial, and immigration files alongside historical capital notices and valuation schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 4: HOW IT WORKS
          ================================================================== */}
      <section className="home-section workflow-section" aria-label="How the Portal Works">
        <div className="home-section-container">
          <div className="section-header">
            <span className="section-tag">INVESTOR ONBOARDING LIFECYCLE</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-desc">
              A straightforward, transparent four-step progression from initial registration to active compliance clearance.
            </p>
          </div>

          <div className="steps-stepper">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-header">
                <span className="step-number-badge">STEP 01</span>
                <div className="step-icon-wrap">
                  <FiUserCheck aria-hidden="true" />
                </div>
              </div>
              <h3 className="step-title">Access Your Portal</h3>
              <p className="step-desc">
                Sign in securely to your verified LP account to access your personalized document workspace and fund overview.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-header">
                <span className="step-number-badge">STEP 02</span>
                <div className="step-icon-wrap">
                  <FiUploadCloud aria-hidden="true" />
                </div>
              </div>
              <h3 className="step-title">Submit Required Documents</h3>
              <p className="step-desc">
                Upload mandated identity, financial, and regulatory records directly via intuitive drag-and-drop validation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-header">
                <span className="step-number-badge">STEP 03</span>
                <div className="step-icon-wrap">
                  <FiCheckSquare aria-hidden="true" />
                </div>
              </div>
              <h3 className="step-title">Complete Document Verification</h3>
              <p className="step-desc">
                Our dedicated compliance team inspects your records against regulatory guidelines with real-time status updates.
              </p>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <div className="step-header">
                <span className="step-number-badge">STEP 04</span>
                <div className="step-icon-wrap">
                  <FiTrendingUp aria-hidden="true" />
                </div>
              </div>
              <h3 className="step-title">Manage Your Investment Information</h3>
              <p className="step-desc">
                Seamlessly track portfolio NAV valuations, review capital drawdowns, and keep your regulatory clearance current.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          SECTION 5: CONTACT US (id="contact")
          ================================================================== */}
      <section id="contact" className="home-section contact-section" aria-label="Contact Investor Relations">
        <div className="home-section-container">
          <div className="section-header">
            <span className="section-tag">INVESTOR RELATIONS &amp; SUPPORT</span>
            <h2 className="section-title">Contact Our Institutional Desk</h2>
            <p className="section-desc">
              Direct, confidential communication channels for accredited limited partners, family offices, and fund managers.
            </p>
          </div>

          <div className="contact-grid">
            {/* Card 1: Investor Relations */}
            <div className="contact-card">
              <div className="contact-icon-box">
                <FiMail aria-hidden="true" />
              </div>
              <h3 className="contact-card-title">Investor Relations Desk</h3>
              <p className="contact-card-desc">
                For fund inquiries, subscription execution, and institutional onboarding assistance.
              </p>
              <div className="contact-card-highlight">
                investor-relations@applen-solutions.demo
              </div>
              <div className="contact-card-timing">
                <FiClock aria-hidden="true" />
                <span>Mon – Fri, 08:00 – 18:00 EST</span>
              </div>
            </div>

            {/* Card 2: Compliance Bureau */}
            <div className="contact-card">
              <div className="contact-icon-box">
                <FiShield aria-hidden="true" />
              </div>
              <h3 className="contact-card-title">Compliance &amp; Audit Bureau</h3>
              <p className="contact-card-desc">
                Direct inquiries regarding KYC document approvals, AML screening, and audit reason resolutions.
              </p>
              <div className="contact-card-highlight">
                compliance@dj-portal.demo
              </div>
              <div className="contact-card-timing">
                <FiClock aria-hidden="true" />
                <span>Priority response within 2 business hours</span>
              </div>
            </div>

            {/* Card 3: Institutional Telephone */}
            <div className="contact-card">
              <div className="contact-icon-box">
                <FiPhone aria-hidden="true" />
              </div>
              <h3 className="contact-card-title">Direct Desk &amp; Headquarters</h3>
              <p className="contact-card-desc">
                Toll-free institutional line and registered private equity administrative office.
              </p>
              <div className="contact-card-highlight">
                +1 (800) 555-APPLEN (Toll-Free)
              </div>
              <div className="contact-card-timing">
                <FiMapPin aria-hidden="true" />
                <span>100 Financial District Blvd, New York, NY</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
