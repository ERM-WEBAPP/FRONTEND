import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Allowance.css';

/* ─── Custom Dropdown ─────────────────────────────── */
const Dropdown = ({ options, defaultSelected }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <div className="al-dropdown" ref={ref}>
      <button className={`al-dd-btn ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        {selected} <ChevronDown size={13} className={open ? 'spin' : ''} />
      </button>
      {open && (
        <div className="al-dd-menu">
          {options.map(o => (
            <div key={o} className={`al-dd-item ${selected === o ? 'sel' : ''}`}
              onClick={() => { setSelected(o); setOpen(false); }}>{o}</div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Travel History Card ─────────────────────────── */
const TravelCard = ({ date, from, to, amount, status, note }) => (
  <div className="al-hist-card">
    <div className="ahc-row-top">
      <span className="ahc-date">{date}</span>
      <span className={`ahc-badge badge-${status.toLowerCase()}`}>{status}</span>
    </div>
    <div className="ahc-metrics">
      <div className="ahc-col">
        <span className="ahc-col-label">From</span>
        <span className="ahc-col-val">{from}</span>
      </div>
      <div className="ahc-col">
        <span className="ahc-col-label">To</span>
        <span className="ahc-col-val">{to}</span>
      </div>
      <div className="ahc-col">
        <span className="ahc-col-label">Amount</span>
        <span className="ahc-col-val">₹{amount}</span>
      </div>
    </div>
    <div className="ahc-note"><b>Notes:</b> {note}</div>
  </div>
);

/* ─── Petrol History Card ─────────────────────────── */
const PetrolCard = ({ date, distance, amount, status }) => (
  <div className="al-hist-card petrol-card">
    <div className="ahc-row-top">
      <span className="ahc-date">{date}</span>
    </div>
    <div className="ahc-metrics align-center">
      <div className="ahc-col">
        <span className="ahc-col-label">Distance</span>
        <span className="ahc-col-val-sm">{distance}</span>
      </div>
      <div className="ahc-col">
        <span className="ahc-col-label">Amount</span>
        <span className="ahc-col-val-sm">₹{amount}</span>
      </div>
      <span className={`ahc-badge badge-${status.toLowerCase()}`}>{status}</span>
    </div>
  </div>
);

/* ─── Main Allowance Page ─────────────────────────── */
const Allowance = () => {
  const [type, setType] = useState('travel');

  return (
    <div className="al-page">
      <div className="al-layout">

        {/* ══════════ LEFT PANEL ══════════ */}
        <div className="al-left">

          {/* Type Selector */}
          <p className="al-type-title">Select Allowance Type</p>
          <div className="al-type-row">
            <button className={`al-type-btn ${type === 'travel' ? 'active' : ''}`} onClick={() => setType('travel')}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2"/><path d="m16 8 5 0 2 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span className="al-type-name">Travel</span>
              <span className="al-type-sub">Official Meetings</span>
            </button>
            <button className={`al-type-btn ${type === 'petrol' ? 'active' : ''}`} onClick={() => setType('petrol')}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 22h12M4 9h10M4 22V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"/><path d="M14 12.5V14a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L16 7"/>
              </svg>
              <span className="al-type-name">Petrol</span>
              <span className="al-type-sub">Daily Commute</span>
            </button>
          </div>

          {/* Travel Form */}
          {type === 'travel' && (
            <form className="al-form">
              <div className="al-form-group">
                <label>From</label>
                <div className="al-input-wrap">
                  <svg className="al-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAA17" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                  <input className="al-input" placeholder="San Francisco HQ" />
                </div>
              </div>
              <div className="al-form-group">
                <label>To</label>
                <div className="al-input-wrap">
                  <svg className="al-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                  <input className="al-input" placeholder="Enter Destination" />
                </div>
              </div>
              <div className="al-form-group">
                <label>Date</label>
                <div className="al-input-wrap">
                  <svg className="al-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  <input type="date" className="al-input" defaultValue="2024-11-24" />
                </div>
              </div>
              <div className="al-form-group">
                <label>Amount</label>
                <input className="al-input no-icon" placeholder="Enter Amount" type="number" />
              </div>
              <div className="al-form-group">
                <label>Notes</label>
                <textarea className="al-input no-icon al-textarea" rows={3} placeholder="Add details about the client visit..." />
              </div>
              <button type="button" className="al-submit-btn">Submit</button>
            </form>
          )}

          {/* Petrol: Stats on left */}
          {type === 'petrol' && (
            <>
              <div className="al-filter-row">
                <span className="al-this-month">This Month</span>
                <Dropdown options={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']} defaultSelected="May" />
                <Dropdown options={['2024','2025','2026']} defaultSelected="Year" />
              </div>
              <div className="al-stats-grid-2x2">
                <div className="al-stat-card al-blue">
                  <div className="al-s-label">TRAVEL DISTANCE</div>
                  <div className="al-s-value">123 km</div>
                </div>
                <div className="al-stat-card al-green">
                  <div className="al-s-label">APPROVED AMOUNT</div>
                  <div className="al-s-value">₹12,334</div>
                </div>
                <div className="al-stat-card al-orange">
                  <div className="al-s-label">PENDING AMOUNT</div>
                  <div className="al-s-value">₹12,334</div>
                </div>
                <div className="al-stat-card al-red">
                  <div className="al-s-label">REJECTED AMOUNT</div>
                  <div className="al-s-value">₹12,334</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ══════════ RIGHT PANEL ══════════ */}
        <div className="al-right">
          <h3 className="al-hist-title">History</h3>

          {/* Travel: 3 inline stat cards + detailed history */}
          {type === 'travel' && (
            <>
              <div className="al-filter-row mb-16">
                <span className="al-this-month">This Month</span>
                <Dropdown options={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']} defaultSelected="May" />
                <Dropdown options={['2024','2025','2026']} defaultSelected="Year" />
              </div>
              <div className="al-stats-3col">
                <div className="al-stat-3 al-green">
                  <div className="al-s-label">APPROVED AMOUNT</div>
                  <div className="al-s-value">₹1,522</div>
                </div>
                <div className="al-stat-3 al-red">
                  <div className="al-s-label">REJECTED AMOUNT</div>
                  <div className="al-s-value">₹1,522</div>
                </div>
                <div className="al-stat-3 al-orange">
                  <div className="al-s-label">PENDING AMOUNT</div>
                  <div className="al-s-value">₹1,522</div>
                </div>
              </div>
              <div className="al-cards-list">
                <TravelCard date="Tue Apr 1 2025" from="Chennai" to="Madurai" amount="1200" status="Approved" note="Office will remain closed for the upcoming ......" />
                <TravelCard date="Tue Apr 1 2025" from="Chennai" to="Madurai" amount="1200" status="Pending" note="Office will remain closed for the upcoming ......" />
                <TravelCard date="Tue Apr 1 2025" from="Chennai" to="Madurai" amount="1200" status="Rejected" note="Office will remain closed for the upcoming ......" />
              </div>
            </>
          )}

          {/* Petrol: compact history cards */}
          {type === 'petrol' && (
            <div className="al-cards-list">
              <PetrolCard date="Tue Apr 1 2025" distance="15 Km" amount="1222" status="Approved" />
              <PetrolCard date="Tue Apr 1 2025" distance="15 Km" amount="1222" status="Pending" />
              <PetrolCard date="Tue Apr 1 2025" distance="15 Km" amount="1222" status="Rejected" />
              <PetrolCard date="Tue Apr 1 2025" distance="15 Km" amount="1222" status="Approved" />
              <PetrolCard date="Tue Apr 1 2025" distance="15 Km" amount="1222" status="Pending" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Allowance;
