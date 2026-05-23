import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, Pointer } from 'lucide-react';
import './Payslip.css';

/* ─── Dropdown ───────────────────────────────────── */
const Dropdown = ({ options, defaultSelected }) => {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(defaultSelected);
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  return (
    <div className="ps-dd" ref={ref}>
      <button className={`ps-dd-btn ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        {sel} <ChevronDown size={13} className={open ? 'spin' : ''} />
      </button>
      {open && (
        <div className="ps-dd-menu">
          {options.map(o => (
            <div key={o} className={`ps-dd-item ${sel === o ? 'sel' : ''}`}
              onClick={() => { setSel(o); setOpen(false); }}>{o}</div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Donut Chart (Template Style) ────────────────── */
const TemplateDonutChart = ({ size = 260, strokeWidth = 28 }) => {
  const chartData = [
    { value: 90.9, color: '#4CAA17', label: 'Earnings' },
    { value: 9.1, color: '#DC2626', label: 'Deductions' },
  ];

  const cx = size / 2;
  const cy = size / 2;
  const r = (size - strokeWidth) / 2;
  
  let currentAngle = -Math.PI / 2 + 0.03; // start slightly offset for the gap

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: 'drop-shadow(2px 8px 12px rgba(0,0,0,0.25))', overflow: 'visible' }}>
        {chartData.map((item, i) => {
          const fraction = item.value / 100;
          const angle = fraction * 2 * Math.PI - 0.06; // gap size

          const nextAngle = currentAngle + angle;
          
          const startX = cx + Math.cos(currentAngle) * r;
          const startY = cy + Math.sin(currentAngle) * r;
          const endX = cx + Math.cos(nextAngle) * r;
          const endY = cy + Math.sin(nextAngle) * r;
          
          const largeArcFlag = fraction > 0.5 ? 1 : 0;
          
          const pathData = `
            M ${startX} ${startY}
            A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}
          `;

          currentAngle = nextAngle + 0.06; // skip gap

          return (
            <path
              key={i}
              d={pathData}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
      {/* Centered Text */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ fontSize: '36px', fontWeight: '800', color: '#222' }}>₹20,000</div>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#888', marginTop: '4px' }}>Gross Pay</div>
      </div>
    </div>
  );
};

/* ─── Payslip History Card ───────────────────────── */
const historyColors = ['#F59E0B', '#F97316', '#8B5CF6', '#3B82F6', '#4CAA17', '#EF4444'];

const HistoryCard = ({ month, dateRange, amount, colorIndex, onClick, active }) => {
  const color = historyColors[colorIndex % historyColors.length];
  return (
    <div
      className={`ps-hist-card ${active ? 'ps-hist-active' : ''}`}
      style={{ borderLeftColor: color }}
      onClick={onClick}
    >
      <div className="ps-hc-left">
        <div className="ps-hc-icon" style={{ background: color }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        </div>
        <div className="ps-hc-info">
          <span className="ps-hc-month">{month}</span>
          <span className="ps-hc-dates">{dateRange}</span>
        </div>
      </div>
      <div className="ps-hc-right">
        <span className="ps-hc-amount">₹{amount}</span>
        <button className="ps-dl-btn" onClick={(e) => e.stopPropagation()}>
          <Download size={15} />
        </button>
      </div>
    </div>
  );
};

/* ─── Detail Row ─────────────────────────────────── */
const DetailRow = ({ label, amount }) => (
  <div className="ps-detail-row">
    <span>{label}</span>
    <span>₹{amount}</span>
  </div>
);

/* ─── Main Payslip Component ─────────────────────── */
const Payslip = () => {
  const [selected, setSelected] = useState(0);

  const payslips = [
    { month: 'Jan', dateRange: '01/01/2026 - 30/01/2026', amount: '20,000' },
    { month: 'Jan', dateRange: '01/01/2026 - 30/01/2026', amount: '20,000' },
    { month: 'Jan', dateRange: '01/01/2026 - 30/01/2026', amount: '20,000' },
    { month: 'Jan', dateRange: '01/01/2026 - 30/01/2026', amount: '20,000' },
    { month: 'Jan', dateRange: '01/01/2026 - 30/01/2026', amount: '20,000' },
    { month: 'Jan', dateRange: '01/01/2026 - 30/01/2026', amount: '20,000' },
  ];

  return (
    <div className="ps-page">
      <div className="ps-layout">

        {/* ══ LEFT: History ══════════════════════════ */}
        <div className="ps-left">
          <div className="ps-greeting">
            <h2 className="ps-hey">Hey Vijay 👋</h2>
            <p className="ps-sub">Welcome To My Pay Summary Details</p>
          </div>

          <div className="ps-hist-header">
            <span className="ps-hist-title">Payslip History</span>
            <Dropdown options={['2024', '2025', '2026']} defaultSelected="Year" />
          </div>

          <div className="ps-hist-list">
            {payslips.map((p, i) => (
              <HistoryCard
                key={i}
                month={p.month}
                dateRange={p.dateRange}
                amount={p.amount}
                colorIndex={i}
                active={selected === i}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>
        </div>

        {/* ══ RIGHT: Summary ══════════════════════════ */}
        <div className="ps-right">
          <h3 className="ps-summary-title">Payslip Summary</h3>

          {/* Template Donut Chart */}
          <div className="ps-chart-wrap" style={{ marginTop: '20px' }}>
            <TemplateDonutChart size={280} strokeWidth={24} />
          </div>

          {/* Legend */}
          <div className="ps-legend" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#4CAA17', marginTop: '6px' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#222', lineHeight: '1.2' }}>₹20,000</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#888' }}>Earnings</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#DC2626', marginTop: '6px' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#222', lineHeight: '1.2' }}>₹2,000</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#888' }}>Deductions</span>
              </div>
            </div>
          </div>

          {/* Earning Details */}
          <h4 className="ps-section-title">Earning Details</h4>
          <div className="ps-detail-card">
            <DetailRow label="Basic" amount="20,000" />
            <DetailRow label="House Rent Allowance" amount="20,000" />
            <DetailRow label="Conveyance Allowance" amount="20,000" />
            <DetailRow label="Earned Leave" amount="20,000" />
          </div>

          {/* Deductions */}
          <h4 className="ps-section-title mt-6">Deductions</h4>
          <div className="ps-detail-card">
            <DetailRow label="EPF" amount="20,000" />
            <DetailRow label="Professional Tax" amount="20,000" />
            <DetailRow label="PF" amount="20,000" />
          </div>

          {/* Action Buttons */}
          <div className="ps-actions">
            <button className="ps-btn-request">
              <Pointer size={18} />
              Request
            </button>
            <button className="ps-btn-download">
              <Download size={17} />
              Download
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payslip;
