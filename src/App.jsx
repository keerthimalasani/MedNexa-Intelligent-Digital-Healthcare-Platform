import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import PatientDetails from './pages/PatientDetails';
import PatientGuide from './pages/PatientGuide';
import Help from './pages/Help';
import AIAssistant from './pages/AIAssistant';
import LabTests from './pages/LabTests';
import Pharmacy from './pages/Pharmacy';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DoctorPortal from './pages/DoctorPortal';
import AdminAnalytics from './pages/AdminAnalytics';
import Appointment from './pages/Appointment';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <BrowserRouter>
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.brandGroup}>
            <div style={styles.logoBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6v12m-6-6h12"/>
              </svg>
            </div>
            <div>
              <span style={styles.brandTitle}>MedNexa</span>
              <span style={styles.brandTag}>ENTERPRISE HEALTH</span>
            </div>
          </Link>

          <nav style={styles.navLinks}>
            <NavLink to="/" style={({ isActive }) => ({ ...styles.link, color: isActive ? '#0284c7' : '#475569', fontWeight: isActive ? '700' : '600' })}>Home</NavLink>
            <NavLink to="/doctors" style={({ isActive }) => ({ ...styles.link, color: isActive ? '#0284c7' : '#475569', fontWeight: isActive ? '700' : '600' })}>Doctors</NavLink>
            <NavLink to="/lab-tests" style={({ isActive }) => ({ ...styles.link, color: isActive ? '#0284c7' : '#475569', fontWeight: isActive ? '700' : '600' })}>🔬 Lab Tests</NavLink>
            <NavLink to="/pharmacy" style={({ isActive }) => ({ ...styles.link, color: isActive ? '#0284c7' : '#475569', fontWeight: isActive ? '700' : '600' })}>💊 Pharmacy & Vitals</NavLink>
            <NavLink to="/patient-details" style={({ isActive }) => ({ ...styles.link, color: isActive ? '#0284c7' : '#475569', fontWeight: isActive ? '700' : '600' })}>Profile</NavLink>
            <NavLink to="/ai-assistant" style={styles.aiBadge}>✨ AI Triage</NavLink>
            <NavLink to="/dashboard" style={({ isActive }) => ({ ...styles.link, color: isActive ? '#0284c7' : '#475569', fontWeight: isActive ? '700' : '600' })}>Dashboard</NavLink>
            <NavLink to="/doctor-portal" style={{ ...styles.link, color: '#16a34a', fontWeight: '700' }}>Doctor Portal</NavLink>
            <NavLink to="/admin-analytics" style={{ ...styles.link, color: '#d97706', fontWeight: '700' }}>Analytics</NavLink>

          </nav>

          <div style={styles.authGroup}>
            <Link to="/login" style={styles.loginBtn}>Sign In</Link>
            <Link to="/register" style={styles.registerBtn}>Get Started</Link>
          </div>
        </div>
      </header>

      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/patient-details" element={<PatientDetails />} />
          <Route path="/patient-guide" element={<PatientGuide />} />
          <Route path="/help" element={<Help />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor-portal" element={<DoctorPortal />} />
          <Route path="/admin-analytics" element={<AdminAnalytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const styles = {
  header: { background: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  navContainer: { maxWidth: '1240px', margin: '0 auto', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brandGroup: { display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' },
  logoBadge: { background: 'linear-gradient(135deg, #0284c7, #0284c7)', color: '#fff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(2, 132, 199, 0.3)' },
  brandTitle: { fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', display: 'block', lineHeight: '1' },
  brandTag: { fontSize: '0.58rem', fontWeight: '800', color: '#0284c7', letterSpacing: '1.2px', marginTop: '2px', display: 'block' },
  navLinks: { display: 'flex', gap: '1.4rem', alignItems: 'center' },
  link: { color: '#475569', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' },
  aiBadge: { background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: '#fff', padding: '0.45rem 0.9rem', borderRadius: '20px', fontWeight: '700', fontSize: '0.82rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)' },
  authGroup: { display: 'flex', gap: '0.8rem', alignItems: 'center' },
  loginBtn: { color: '#0f172a', fontWeight: '700', fontSize: '0.9rem', padding: '0.55rem 0.9rem', textDecoration: 'none' },
  registerBtn: { background: '#0f172a', color: '#ffffff', padding: '0.6rem 1.25rem', borderRadius: '10px', fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.15)' }
};