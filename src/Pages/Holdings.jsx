/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Pages/Holdings.jsx
 * 
 * Holdings & Portfolio Page
 * Displays portfolio company investments, Net Asset Value (NAV),
 * MOIC multiples, IRR benchmarks, and capital distributions.
 */

import React from 'react';
import { 
  FiTrendingUp, 
  FiPieChart, 
  FiDollarSign, 
  FiShield, 
  FiArrowUpRight 
} from 'react-icons/fi';
import '../Styles/Pages/holdings.css';

const PORTFOLIO_HOLDINGS = [
  {
    id: 'h-1',
    name: 'Apex Cloud Infrastructure',
    code: 'APX',
    sector: 'Enterprise SaaS & Cloud',
    round: 'Series A Lead',
    date: 'Jan 15, 2024',
    invested: '$2,500,000',
    valuation: '$6,250,000',
    gain: '+150.0%',
    status: 'Performing'
  },
  {
    id: 'h-2',
    name: 'NovaPay Global Technologies',
    code: 'NOV',
    sector: 'Fintech & Cross-border Rail',
    round: 'Series B Syndicate',
    date: 'Jun 22, 2024',
    invested: '$3,200,000',
    valuation: '$7,840,000',
    gain: '+145.0%',
    status: 'Performing'
  },
  {
    id: 'h-3',
    name: 'Veritas BioHealth Labs',
    code: 'VBL',
    sector: 'Precision Therapeutics',
    round: 'Growth Equity',
    date: 'Nov 04, 2024',
    invested: '$4,500,000',
    valuation: '$8,100,000',
    gain: '+80.0%',
    status: 'Performing'
  },
  {
    id: 'h-4',
    name: 'Helios Clean Grid Energy',
    code: 'HCG',
    sector: 'Renewables & Infrastructure',
    round: 'Series A Co-Invest',
    date: 'Feb 18, 2025',
    invested: '$2,000,000',
    valuation: '$3,400,000',
    gain: '+70.0%',
    status: 'Performing'
  },
  {
    id: 'h-5',
    name: 'Cobalt Quantum Cyber Systems',
    code: 'CQC',
    sector: 'Defense & Cybersecurity',
    round: 'Seed Lead',
    date: 'Aug 12, 2025',
    invested: '$1,500,000',
    valuation: '$2,850,000',
    gain: '+90.0%',
    status: 'Growth'
  }
];

const Holdings = () => {
  return (
    <div className="holdings-page">
      {/* Portfolio Header */}
      <section className="holdings-hero">
        <div className="holdings-hero-content">
          <div className="holdings-titles">
            <span className="holdings-pretitle">Portfolio Management • Series A Fund</span>
            <h1 className="holdings-title">Private Equity &amp; Venture Holdings</h1>
            <p className="holdings-subtitle">
              Comprehensive valuation schedule, unrealized multiples, and audited NAV for David Jenkins (Account #DJ-7729-LP).
            </p>
          </div>

          {/* 4 Summary Cards */}
          <div className="portfolio-metrics-grid">
            <div className="portfolio-metric-card">
              <div className="metric-text-group">
                <span className="metric-label">Current Net Asset Value (NAV)</span>
                <span className="metric-value">$34.85M</span>
                <span className="metric-submeta positive">
                  <FiArrowUpRight aria-hidden="true" />
                  +24.8% Net IRR (Annualized)
                </span>
              </div>
              <div className="metric-icon-box" aria-hidden="true">
                <FiTrendingUp />
              </div>
            </div>

            <div className="portfolio-metric-card">
              <div className="metric-text-group">
                <span className="metric-label">Total Capital Invested</span>
                <span className="metric-value">$18.25M</span>
                <span className="metric-submeta" style={{ color: '#64748B' }}>
                  73.0% of $25M committed capital
                </span>
              </div>
              <div className="metric-icon-box" aria-hidden="true">
                <FiDollarSign />
              </div>
            </div>

            <div className="portfolio-metric-card">
              <div className="metric-text-group">
                <span className="metric-label">Multiple on Invested Capital</span>
                <span className="metric-value">2.31x</span>
                <span className="metric-submeta positive">
                  <FiArrowUpRight aria-hidden="true" />
                  Top Quartile Benchmark
                </span>
              </div>
              <div className="metric-icon-box" aria-hidden="true">
                <FiPieChart />
              </div>
            </div>

            <div className="portfolio-metric-card">
              <div className="metric-text-group">
                <span className="metric-label">Realized Cash Distributions</span>
                <span className="metric-value">$4.60M</span>
                <span className="metric-submeta" style={{ color: '#15966A' }}>
                  Returned to LP accounts
                </span>
              </div>
              <div className="metric-icon-box" aria-hidden="true">
                <FiShield />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="holdings-container">
        <div className="holdings-table-card">
          <div className="table-card-header">
            <div>
              <h2 className="table-card-title">Active Fund Investments</h2>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                Audited schedule of private equity positions as of Q1 2026
              </p>
            </div>
            <span className="table-badge-filter">
              5 Active Investments
            </span>
          </div>

          <div className="table-responsive-wrapper">
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Portfolio Company</th>
                  <th>Investment Round</th>
                  <th>Initial Close</th>
                  <th>Invested Capital</th>
                  <th>Current Valuation</th>
                  <th>Unrealized Gain</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PORTFOLIO_HOLDINGS.map((asset) => (
                  <tr key={asset.id}>
                    <td>
                      <div className="company-cell">
                        <div className="company-avatar">{asset.code}</div>
                        <div>
                          <div className="company-name">{asset.name}</div>
                          <div className="company-sector">{asset.sector}</div>
                        </div>
                      </div>
                    </td>
                    <td>{asset.round}</td>
                    <td>{asset.date}</td>
                    <td className="cell-currency">{asset.invested}</td>
                    <td className="cell-currency">{asset.valuation}</td>
                    <td>
                      <span className="cell-gain">
                        <FiArrowUpRight aria-hidden="true" />
                        {asset.gain}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${asset.status.toLowerCase()}`}>
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Holdings;
