import React from 'react';
import { Pencil, Contact, Phone, Mail, Calendar, Droplet, Laptop, Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import profileAvatarImg from '../Assets/profile_avatar.png';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page-modern page-enter">
      
      {/* Top Banner Card */}
      <div className="profile-banner-card">
        <div className="banner-green-bg"></div>
        <div className="banner-content">
          <div className="profile-avatar-container">
            <div className="profile-avatar-modern">
              <img src={profileAvatarImg} alt="Vijay Profile" className="profile-img-real" />
            </div>
            <div className="verified-badge">
              <CheckCircle size={16} fill="#4CAA17" color="white" />
            </div>
          </div>
          <div className="profile-identity-modern">
            <h1>Vijay</h1>
            <p>UI UX DESIGNER</p>
          </div>
        </div>
      </div>

      <div className="profile-main-grid">
        {/* Left Column - Personal Info */}
        <div className="profile-left-col">
          <div className="section-header-modern">
            <h2>Personal Information</h2>
          </div>

          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-text">
                <label>EMPLOYEE ID</label>
                <p>TES005</p>
              </div>
              <Contact size={20} className="info-icon" />
            </div>
            
            <div className="info-card">
              <div className="info-text">
                <label>MOBILE NO</label>
                <p>+91 9988776655</p>
              </div>
              <Phone size={20} className="info-icon" />
            </div>

            <div className="info-card">
              <div className="info-text">
                <label>EMAIL ID</label>
                <p>Bhvhjh@Gmail.com</p>
              </div>
              <Mail size={20} className="info-icon" />
            </div>

            <div className="info-card">
              <div className="info-text">
                <label>DATE OF BIRTH</label>
                <p>20-09-2005</p>
              </div>
              <Calendar size={20} className="info-icon" />
            </div>

            <div className="info-card full-width">
              <div className="info-text">
                <label>BLOOD GROUP</label>
                <p>A+</p>
              </div>
              <Droplet size={20} className="info-icon blood-icon" />
            </div>
          </div>
        </div>

        {/* Right Column - Assigned Assets */}
        <div className="profile-right-col">
          <div className="section-header-modern">
            <h2>Assigned Assets</h2>
          </div>

          <div className="assets-list">
            <div className="asset-card">
              <div className="asset-top">
                <div className="asset-icon-box">
                  <Laptop size={24} />
                </div>
                <span className="asset-badge">ACTIVE</span>
              </div>
              <div className="asset-details">
                <h3>MacBook Pro 14"</h3>
                <p>Serial: TCO-LP-088</p>
              </div>
              <div className="asset-footer">
                <span className="issue-date">Issued: Oct 2023</span>
              </div>
            </div>

            <div className="asset-card">
              <div className="asset-top">
                <div className="asset-icon-box">
                  <Smartphone size={24} />
                </div>
                <span className="asset-badge">ACTIVE</span>
              </div>
              <div className="asset-details">
                <h3>iPhone 15</h3>
                <p>Serial: TCO-MB-021</p>
              </div>
              <div className="asset-footer">
                <span className="issue-date">Issued: Dec 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
