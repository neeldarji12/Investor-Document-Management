/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Components/Navbar.jsx
 * 
 * Clean, Streamlined Institutional Navigation Bar:
 * - On Home Page (/):
 *     * Left: Brand Identity + Links: Home, About, Contact Us
 *     * Removed Dashboard button from Home navbar
 * - On Dashboard Pages (/documents, /reviewer):
 *     * Left: Brand Identity + Interactive Mode Switcher Dropdown
 *         (Dropdown selects which mode to enter: Investor Mode or Reviewer Mode)
 *     * Right: Reset Data button, Notification Bell dropdown, User Profile menu
 *     * Removed Home link from Dashboard navbar
 */

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome,
  FiInfo,
  FiMail,
  FiUser, 
  FiCheckSquare, 
  FiRotateCcw, 
  FiBell, 
  FiChevronDown, 
  FiMenu, 
  FiX, 
  FiCheckCircle, 
  FiClock, 
  FiAlertTriangle, 
  FiShield, 
  FiLock, 
  FiLogOut,
  FiCheck,
  FiPieChart,
  FiDollarSign,
  FiFileText
} from 'react-icons/fi';
import '../Styles/Components/navbar.css';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Aadhaar Card Verified',
    desc: 'Compliance desk has approved your identity record.',
    time: '12m ago',
    type: 'success',
    unread: true
  },
  {
    id: 2,
    title: 'PAN Card Under Review',
    desc: 'Assigned to compliance officer Sarah Vance for inspection.',
    time: '1h ago',
    type: 'info',
    unread: true
  },
  {
    id: 3,
    title: 'Passport Scan Rejected',
    desc: 'MRZ barcode blurred. Please review audit reason and re-upload.',
    time: '3h ago',
    type: 'warning',
    unread: true
  },
  {
    id: 4,
    title: 'Q1 2026 Valuation Pack Available',
    desc: 'Audited financial statements and NAV statements are now ready.',
    time: '1d ago',
    type: 'info',
    unread: false
  }
];

const Navbar = ({
  pendingReviewCount = 0,
  onResetData
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Page detection: Home page vs Dashboard pages
  const isHomePage = location.pathname === '/';
  const isReviewerPath = location.pathname.startsWith('/reviewer');

  // Active section tracking on Home page
  const [activeSection, setActiveSection] = useState('home');

  // Dropdown states
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const modeRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Unread notification count
  const unreadNotificationCount = notifications.filter((n) => n.unread).length;

  // Track active section on Home page during scroll
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactEl = document.getElementById('contact');
      const aboutEl = document.getElementById('about');

      if (contactEl && scrollY + 350 >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (aboutEl && scrollY + 350 >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modeRef.current && !modeRef.current.contains(e.target)) {
        setIsModeOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModeOpen(false);
        setIsNotificationOpen(false);
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const closeAllMenus = () => {
    setIsModeOpen(false);
    setIsMobileMenuOpen(false);
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
  };

  // Scroll to section handler for Home page
  const handleScrollToSection = (sectionId) => {
    closeAllMenus();
    setActiveSection(sectionId);
    if (!isHomePage) {
      navigate('/#' + sectionId);
      return;
    }
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="navbar" role="banner">
      <div className="navbar-container">
        {/* ==================================================================
            LEFT: BRAND IDENTITY & CONTEXTUAL NAVIGATION / MODE SELECTOR
            ================================================================== */}
        <div className="navbar-left">
          <NavLink
            to="/"
            className="navbar-brand"
            title="APPLEN SOLUTIONS – DJ Investor Portal"
            onClick={() => {
              closeAllMenus();
              if (isHomePage) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="brand-logo-icon" aria-hidden="true">
              <span className="brand-logo-monogram">DJ</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">APPLEN SOLUTIONS</span>
              <span className="brand-subtitle">DJ INVESTOR PORTAL</span>
            </div>
          </NavLink>

          <div className="navbar-divider" aria-hidden="true"></div>

          {/* Contextual Navigation: Links on Home, Portal Nav + Mode Dropdown on Dashboard */}
          {isHomePage ? (
            /* HOME PAGE: ONLY Home, About, Contact Us */
            <nav className="navbar-nav-links" aria-label="Home Navigation">
              <button
                type="button"
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => handleScrollToSection('home')}
              >
                <FiHome aria-hidden="true" />
                <span>Home</span>
              </button>

              <button
                type="button"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => handleScrollToSection('about')}
              >
                <FiInfo aria-hidden="true" />
                <span>About</span>
              </button>

              <button
                type="button"
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => handleScrollToSection('contact')}
              >
                <FiMail aria-hidden="true" />
                <span>Contact Us</span>
              </button>
            </nav>
          ) : (
            /* DASHBOARD: Portal Nav Links (Documents/Reviewer, Portfolio Holdings, Capital Calls) + Mode Dropdown */
            <>
              <nav className="navbar-nav-links" aria-label="Portal Navigation">
                {isReviewerPath ? (
                  <NavLink
                    to="/reviewer"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    title="Compliance Verification Desk"
                    onClick={closeAllMenus}
                  >
                    <FiCheckSquare aria-hidden="true" />
                    <span>Compliance Desk</span>
                    {pendingReviewCount > 0 && (
                      <span className="nav-badge" title={`${pendingReviewCount} items in audit queue`}>
                        {pendingReviewCount}
                      </span>
                    )}
                  </NavLink>
                ) : (
                  <NavLink
                    to="/documents"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    title="Documents & KYC"
                    onClick={closeAllMenus}
                  >
                    <FiFileText aria-hidden="true" />
                    <span>Documents &amp; KYC</span>
                  </NavLink>
                )}

                <NavLink
                  to="/holdings"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  title="Portfolio Holdings & Asset Allocations"
                  onClick={closeAllMenus}
                >
                  <FiPieChart aria-hidden="true" />
                  <span>Portfolio Holdings</span>
                </NavLink>

                <NavLink
                  to="/capital-calls"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  title="Capital Calls & Drawdowns"
                  onClick={closeAllMenus}
                >
                  <FiDollarSign aria-hidden="true" />
                  <span>Capital Calls</span>
                </NavLink>
              </nav>

              <div className="navbar-divider" aria-hidden="true"></div>

              {/* MODE SELECTOR DROPDOWN (Choose Investor or Reviewer Mode) */}
              <div className="mode-dropdown-wrapper" ref={modeRef}>
                <button
                  type="button"
                  className={`mode-dropdown-btn ${isModeOpen ? 'active' : ''}`}
                  onClick={() => {
                    setIsModeOpen((prev) => !prev);
                    setIsNotificationOpen(false);
                    setIsProfileOpen(false);
                  }}
                  aria-label="Select Portal Operational Mode"
                  aria-expanded={isModeOpen}
                  aria-haspopup="true"
                >
                  <div className="mode-btn-content">
                    {isReviewerPath ? (
                      <FiCheckSquare className="mode-status-icon reviewer" aria-hidden="true" />
                    ) : (
                      <FiUser className="mode-status-icon investor" aria-hidden="true" />
                    )}
                    <span className="mode-label-prefix">Mode:</span>
                    <span className="mode-active-name">
                      {isReviewerPath ? 'Reviewer Mode' : 'Investor Mode'}
                    </span>
                    {isReviewerPath && pendingReviewCount > 0 && (
                      <span className="mode-queue-badge" title={`${pendingReviewCount} items in audit queue`}>
                        {pendingReviewCount}
                      </span>
                    )}
                  </div>
                  <FiChevronDown className={`mode-chevron ${isModeOpen ? 'rotated' : ''}`} aria-hidden="true" />
                </button>

                {/* Mode Dropdown Menu Panel */}
                {isModeOpen && (
                  <div className="dropdown-panel mode-dropdown-menu" role="menu" aria-label="Select Mode to Enter">
                    <div className="mode-dropdown-header">
                      <span className="mode-header-label">Switch Operational Mode</span>
                      <span className="mode-header-sub">Choose which portal mode you enter</span>
                    </div>

                    <div className="mode-dropdown-list">
                      {/* Option 1: Investor Mode */}
                      <button
                        type="button"
                        role="menuitem"
                        className={`mode-option-item ${!isReviewerPath ? 'selected' : ''}`}
                        onClick={() => {
                          setIsModeOpen(false);
                          navigate('/documents');
                        }}
                      >
                        <div className="mode-option-icon investor" aria-hidden="true">
                          <FiUser />
                        </div>
                        <div className="mode-option-details">
                          <div className="mode-option-title-row">
                            <span className="mode-option-name">Investor Mode</span>
                            {!isReviewerPath && (
                              <span className="mode-active-chip">Active</span>
                            )}
                          </div>
                          <div className="mode-option-desc">
                            Document checklist, KYC upload, and verification tracking
                          </div>
                        </div>
                        {!isReviewerPath && (
                          <FiCheck className="mode-check-icon" aria-hidden="true" />
                        )}
                      </button>

                      {/* Option 2: Reviewer Mode */}
                      <button
                        type="button"
                        role="menuitem"
                        className={`mode-option-item ${isReviewerPath ? 'selected' : ''}`}
                        onClick={() => {
                          setIsModeOpen(false);
                          navigate('/reviewer');
                        }}
                      >
                        <div className="mode-option-icon reviewer" aria-hidden="true">
                          <FiCheckSquare />
                        </div>
                        <div className="mode-option-details">
                          <div className="mode-option-title-row">
                            <span className="mode-option-name">Reviewer Mode</span>
                            <div className="mode-option-badges">
                              {pendingReviewCount > 0 && (
                                <span className="mode-option-queue-tag">{pendingReviewCount} pending</span>
                              )}
                              {isReviewerPath && (
                                <span className="mode-active-chip">Active</span>
                              )}
                            </div>
                          </div>
                          <div className="mode-option-desc">
                            Compliance verification desk, document audit, and approvals
                          </div>
                        </div>
                        {isReviewerPath && (
                          <FiCheck className="mode-check-icon" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ==================================================================
            RIGHT: CONTEXTUAL ACTIONS
            - On Home: Mobile Toggle Only (Dashboard Button Removed)
            - On Dashboard: Reset Data, Notification Bell, User Profile (Home Link Removed)
            ================================================================== */}
        <div className="navbar-actions">
          {!isHomePage && (
            /* DASHBOARD ACTIONS: Reset Data, Notifications, Profile (Home Removed) */
            <>
              {/* Reset Mock Data Button */}
              {onResetData && (
                <button
                  type="button"
                  className="btn-reset-demo"
                  onClick={onResetData}
                  title="Reset mock documents to initial demo state"
                >
                  <FiRotateCcw aria-hidden="true" />
                  <span>Reset Data</span>
                </button>
              )}

              {/* Interactive Notification Center */}
              <div className="notification-wrapper" ref={notificationRef}>
                <button
                  type="button"
                  className={`notification-bell-btn ${isNotificationOpen ? 'active' : ''}`}
                  onClick={() => {
                    setIsNotificationOpen((prev) => !prev);
                    setIsProfileOpen(false);
                    setIsModeOpen(false);
                  }}
                  aria-label="Toggle notifications dropdown"
                  aria-expanded={isNotificationOpen}
                >
                  <FiBell aria-hidden="true" />
                  {unreadNotificationCount > 0 && (
                    <span className="bell-badge-dot" aria-hidden="true"></span>
                  )}
                </button>

                {/* Notification Dropdown Menu */}
                {isNotificationOpen && (
                  <div className="dropdown-panel notification-dropdown" role="region" aria-label="Notifications">
                    <div className="dropdown-header">
                      <div className="dropdown-title-group">
                        <span className="dropdown-title">System Audit Alerts</span>
                        <span className="dropdown-counter">{unreadNotificationCount} unread</span>
                      </div>
                      {unreadNotificationCount > 0 && (
                        <button
                          type="button"
                          className="btn-text-action"
                          onClick={handleMarkAllRead}
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="notification-list">
                      {notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`notification-item ${item.unread ? 'unread' : ''}`}
                        >
                          <div className={`notification-icon-pill ${item.type}`} aria-hidden="true">
                            {item.type === 'success' && <FiCheckCircle />}
                            {item.type === 'warning' && <FiAlertTriangle />}
                            {item.type === 'info' && <FiClock />}
                          </div>
                          <div className="notification-details">
                            <div className="notification-item-title">{item.title}</div>
                            <div className="notification-item-desc">{item.desc}</div>
                            <div className="notification-item-time">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="dropdown-footer">
                      <span>DJ Compliance Bureau • Real-time Monitoring</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="navbar-divider" aria-hidden="true"></div>

              {/* Interactive User Profile Avatar & Dropdown */}
              <div className="profile-wrapper" ref={profileRef}>
                <button
                  type="button"
                  className={`user-profile-menu ${isProfileOpen ? 'active' : ''}`}
                  onClick={() => {
                    setIsProfileOpen((prev) => !prev);
                    setIsNotificationOpen(false);
                    setIsModeOpen(false);
                  }}
                  aria-label="Toggle user profile menu"
                  aria-expanded={isProfileOpen}
                >
                  <div className="user-avatar" aria-hidden="true">
                    {isReviewerPath ? 'SV' : 'DJ'}
                  </div>
                  <div className="user-info">
                    <span className="user-name">
                      {isReviewerPath ? 'Sarah Vance' : 'David Jenkins'}
                    </span>
                    <span className="user-role">
                      {isReviewerPath ? 'Senior Compliance Officer' : 'Accredited LP Investor'}
                    </span>
                  </div>
                  <FiChevronDown className={`user-dropdown-icon ${isProfileOpen ? 'rotated' : ''}`} aria-hidden="true" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="dropdown-panel profile-dropdown" role="menu" aria-label="User Account">
                    <div className="profile-dropdown-header">
                      <div className="profile-header-avatar" aria-hidden="true">
                        {isReviewerPath ? 'SV' : 'DJ'}
                      </div>
                      <div className="profile-header-meta">
                        <div className="profile-header-name">
                          {isReviewerPath ? 'Sarah Vance' : 'David Jenkins'}
                        </div>
                        <div className="profile-header-email">
                          {isReviewerPath ? 's.vance@applen-compliance.com' : 'david.jenkins@jenkins-holdings.com'}
                        </div>
                        <span className="profile-account-pill">
                          <FiShield aria-hidden="true" />
                          {isReviewerPath ? 'Compliance Officer #CO-8910' : 'Account #DJ-7729-LP • Series A'}
                        </span>
                      </div>
                    </div>

                    <div className="profile-menu-links">
                      <button
                        type="button"
                        className="profile-menu-item"
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate(isReviewerPath ? '/documents' : '/reviewer');
                        }}
                      >
                        {isReviewerPath ? <FiUser aria-hidden="true" /> : <FiCheckSquare aria-hidden="true" />}
                        <span>Switch to {isReviewerPath ? 'Investor Portal' : 'Compliance Desk'}</span>
                      </button>

                      <div className="profile-menu-item disabled">
                        <FiShield aria-hidden="true" />
                        <span>KYC &amp; AML Verified: Tier-1</span>
                      </div>

                      <div className="profile-menu-item disabled">
                        <FiLock aria-hidden="true" />
                        <span>256-Bit Hardware Security Active</span>
                      </div>
                    </div>

                    <div className="profile-dropdown-footer">
                      <button
                        type="button"
                        className="btn-profile-logout"
                        onClick={() => {
                          setIsProfileOpen(false);
                          alert('Simulated session exit: In demo mode, investor credentials remain signed in.');
                        }}
                      >
                        <FiLogOut aria-hidden="true" />
                        <span>Exit Portal Session</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* ==================================================================
          MOBILE NAVIGATION SLIDE-DOWN DRAWER
          ================================================================== */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer" role="region" aria-label="Mobile Navigation Drawer">
          {isHomePage ? (
            /* HOME PAGE MOBILE DRAWER: Home, About, Contact Us (Dashboard Button Removed) */
            <nav className="mobile-nav-links">
              <button
                type="button"
                className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => handleScrollToSection('home')}
              >
                <FiHome aria-hidden="true" />
                <span>Home</span>
              </button>

              <button
                type="button"
                className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => handleScrollToSection('about')}
              >
                <FiInfo aria-hidden="true" />
                <span>About</span>
              </button>

              <button
                type="button"
                className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => handleScrollToSection('contact')}
              >
                <FiMail aria-hidden="true" />
                <span>Contact Us</span>
              </button>
            </nav>
          ) : (
            /* DASHBOARD MOBILE DRAWER: Portal Nav Links, Mode Selection Cards & Reset Data */
            <>
              <div className="mobile-section-label" style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                PORTAL NAVIGATION
              </div>
              <nav className="mobile-nav-links" style={{ marginBottom: '1rem' }}>
                {isReviewerPath ? (
                  <NavLink
                    to="/reviewer"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeAllMenus}
                  >
                    <FiCheckSquare aria-hidden="true" />
                    <span>Compliance Desk</span>
                    {pendingReviewCount > 0 && (
                      <span className="nav-badge" style={{ marginLeft: 'auto' }}>{pendingReviewCount}</span>
                    )}
                  </NavLink>
                ) : (
                  <NavLink
                    to="/documents"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeAllMenus}
                  >
                    <FiFileText aria-hidden="true" />
                    <span>Documents &amp; KYC</span>
                  </NavLink>
                )}

                <NavLink
                  to="/holdings"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeAllMenus}
                >
                  <FiPieChart aria-hidden="true" />
                  <span>Portfolio Holdings</span>
                </NavLink>

                <NavLink
                  to="/capital-calls"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeAllMenus}
                >
                  <FiDollarSign aria-hidden="true" />
                  <span>Capital Calls</span>
                </NavLink>
              </nav>

              <div className="mobile-drawer-footer">
                {onResetData && (
                  <button
                    type="button"
                    className="btn-reset-demo"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => {
                      onResetData();
                      closeAllMenus();
                    }}
                  >
                    <FiRotateCcw aria-hidden="true" />
                    <span>Reset Demo Data</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
