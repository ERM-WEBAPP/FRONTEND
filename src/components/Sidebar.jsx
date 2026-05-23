import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Umbrella, 
  Wallet, 
  ReceiptText, 
  Megaphone, 
  Bell, 
  Users, 
  PieChart, 
  Settings, 
  LogOut,
  Menu,
  ChevronLeft,
  UserCircle,
  MessageSquare,
  Shield
} from 'lucide-react';
import ermLogo from '../Assets/ERM_logo.svg';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { path: '/leave', label: 'Leave Management', icon: Umbrella },
  { path: '/allowance', label: 'Allowance', icon: Wallet },
  { path: '/payslip', label: 'Payslip', icon: ReceiptText },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/complaint', label: 'Raise Complaint', icon: MessageSquare },
  { path: '/manager', label: 'Manager Access', icon: Shield },
  { path: '/profile', label: 'Profile', icon: UserCircle },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar glass ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {isOpen && <img src={ermLogo} alt="TESCO ERM Logo" style={{ height: '56px' }} className="logo" />}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="user-profile-mini">
          <div className="avatar">V</div>
          <div className="user-info">
            <h4>Vijay Kumar</h4>
            <p>Senior Developer</p>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={!isOpen ? item.label : ''}
          >
            <item.icon className="nav-icon" size={20} />
            {isOpen && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout-btn" title={!isOpen ? 'Logout' : ''} onClick={() => navigate('/login')}>
          <LogOut className="nav-icon" size={20} />
          {isOpen && <span className="nav-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
