/**
 * APPLEN SOLUTIONS – DJ Investor Portal
 * File: src/Pages/CapitalCalls.jsx
 * 
 * Capital Calls & Drawdown Management Page
 * Displays capital commitment totals, drawdown notices, wired payments,
 * and remaining unfunded commitment.
 */

import React from 'react';
import { 
  FiCheckCircle, 
  FiClock, 
  FiDollarSign, 
  FiCreditCard 
} from 'react-icons/fi';
import '../Styles/Pages/capitalCalls.css';

const CAPITAL_CALLS_HISTORY = [
  {
    id: 'CC-2025-004',
    purpose: 'Series B Drawdown: NovaPay Global & Working Reserve',
    fund: 'Applen Growth Fund I',
    callAmount: '$3,200,000',
    noticeDate: 'Nov 12, 2025',
    dueDate: 'Nov 26, 2025',
    settledDate: 'Nov 24, 2025',
    status: 'Settled'
  },
  {
    id: 'CC-2025-003',
    purpose: 'Growth Tranche: Veritas BioHealth Labs & Follow-on Tranches',
    fund: 'Applen Growth Fund I',
    callAmount: '$4,500,000',
    noticeDate: 'Jul 05, 2025',
    dueDate: 'Jul 20, 2025',
    settledDate: 'Jul 18, 2025',
    status: 'Settled'
  },
  {
    id: 'CC-2024-002',
    purpose: 'Apex Cloud Infrastructure Series A Syndication',
    fund: 'Applen Growth Fund I',
    callAmount: '$2,500,000',
    noticeDate: 'Dec 02, 2024',
    dueDate: 'Dec 16, 2024',
    settledDate: 'Dec 14, 2024',
    status: 'Settled'
  },
  {
    id: 'CC-2024-001',
    purpose: 'Initial Limited Partner Commitment Drawdown & Fund Setup',
    fund: 'Applen Growth Fund I',
    callAmount: '$8,050,000',
    noticeDate: 'Feb 10, 2024',
    dueDate: 'Feb 25, 2024',
    settledDate: 'Feb 22, 2024',
    status: 'Settled'
  }
];

const CapitalCalls = () => {
  return (
    <div className="capital-calls-page">
      {/* Header Banner */}
      <section className="capital-hero">
        <div className="capital-hero-content">
          <div className="capital-titles">
            <span className="capital-pretitle">Capital Management • Limited Partner Portal</span>
            <h1 className="capital-title">Capital Calls &amp; Drawdown Schedule</h1>
            <p className="capital-subtitle">
              Official record of capital notices, funded commitment tranches, and wire settlement receipts for David Jenkins (#DJ-7729-LP).
            </p>
          </div>

          {/* 4 Summary Cards */}
          <div className="capital-metrics-grid">
            <div className="capital-metric-card">
              <div className="metric-text-group">
                <span className="metric-label">Total Capital Commitment</span>
                <span className="metric-value">$25.00M</span>
                <span className="metric-submeta" style={{ color: '#64748B' }}>
                  Series A Institutional LP Class
                </span>
              </div>
              <div className="metric-icon-box" aria-hidden="true">
                <FiDollarSign />
              </div>
            </div>

            <div className="capital-metric-card">
              <div className="metric-text-group">
                <span className="metric-label">Total Capital Called</span>
                <span className="metric-value">$18.25M</span>
                <span className="metric-submeta metric-highlight">
                  73.0% of Total Committed
                </span>
              </div>
              <div className="metric-icon-box" aria-hidden="true">
                <FiCheckCircle />
              </div>
            </div>

            <div className="capital-metric-card">
              <div className="metric-text-group">
                <span className="metric-label">Remaining Uncalled Capital</span>
                <span className="metric-value">$6.75M</span>
                <span className="metric-submeta" style={{ color: '#D97706' }}>
                  27.0% dry powder reserve
                </span>
              </div>
              <div className="metric-icon-box" aria-hidden="true">
                <FiClock />
              </div>
            </div>

            <div className="capital-metric-card">
              <div className="metric-text-group">
                <span className="metric-label">Outstanding Notice Balance</span>
                <span className="metric-value">$0.00</span>
                <span className="metric-submeta metric-highlight">
                  All calls current &amp; fully settled
                </span>
              </div>
              <div className="metric-icon-box" aria-hidden="true">
                <FiCreditCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="capital-calls-container">
        <div className="capital-table-card">
          <div className="capital-table-header">
            <div>
              <h2 className="table-card-title">Drawdown Notice Ledger</h2>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                Complete audit history of capital drawdown notices and wire settlement confirmations
              </p>
            </div>
            <span className="table-badge-filter">
              4 Notices Settled
            </span>
          </div>

          <div className="table-responsive-wrapper">
            <table className="capital-table">
              <thead>
                <tr>
                  <th>Notice Reference</th>
                  <th>Purpose / Tranche Allocation</th>
                  <th>Notice Date</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Settlement Status</th>
                </tr>
              </thead>
              <tbody>
                {CAPITAL_CALLS_HISTORY.map((call) => (
                  <tr key={call.id}>
                    <td>
                      <span className="call-id-badge">{call.id}</span>
                    </td>
                    <td>
                      <div className="call-purpose-title">{call.purpose}</div>
                      <div className="call-purpose-desc">{call.fund}</div>
                    </td>
                    <td>{call.noticeDate}</td>
                    <td>{call.dueDate}</td>
                    <td className="cell-currency">{call.callAmount}</td>
                    <td>
                      <span className="settlement-badge settled">
                        <FiCheckCircle aria-hidden="true" />
                        Settled ({call.settledDate})
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

export default CapitalCalls;
