import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItemStyle = (path) => ({
    background: 'none',
    border: 'none',
    color: isActive(path) ? '#38bdf8' : '#cbd5e1',
    fontWeight: isActive(path) ? '800' : '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    transition: 'all 0.2s ease'
  });

  return (
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      height: '75px', 
      background: '#090d16', 
      borderBottom: '1px solid rgba(255,255,255,0.08)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 2.5rem', 
      zIndex: 1000,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Brand Logo */}
      <div 
        onClick={() => navigate('/')} 
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      >
        <span style={{ 
          background: '#0284c7', 
          color: '#fff', 
          width: '32px', 
          height: '32px', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontWeight: '800', 
          fontSize: '1.1rem',
          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)'
        }}>
          +
        </span>
        <div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>MedNexa</h1>
          <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' }}>ENTERPRISE HEALTH</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button onClick={() => navigate('/')} style={navItemStyle('/')}>Home</button>
        <button onClick={() => navigate('/doctors')} style={navItemStyle('/doctors')}>Doctors</button>
        <button onClick={() => navigate('/lab-tests')} style={navItemStyle('/lab-tests')}>Lab Tests</button>
        <button onClick={() => navigate('/pharmacy')} style={navItemStyle('/pharmacy')}>Pharmacy & Vitals</button>
        <button onClick={() => navigate('/dashboard')} style={navItemStyle('/dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/analytics')} style={navItemStyle('/analytics')}>Analytics</button>
        <button onClick={() => navigate('/help')} style={navItemStyle('/help')}>Help</button>
      </nav>

      {/* Action CTA */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ 
            background: '#0284c7', 
            color: '#fff', 
            border: 'none', 
            padding: '0.6rem 1.2rem', 
            borderRadius: '10px', 
            fontWeight: '700', 
            fontSize: '0.85rem', 
            cursor: 'pointer', 
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
            transition: 'all 0.2s ease'
          }}
        >
          Get Started
        </button>
      </div>

    </header>
  );
}