import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [devOtpHint, setDevOtpHint] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('mednexa_users') || '[]');
      const userExists = existingUsers.some(user => user.email === emailOrPhone);

      if (userExists) {
        setLoading(false);
        alert('An account with this email/phone already exists!');
        return;
      }

      const newUser = {
        id: Date.now(),
        name: fullName,
        email: emailOrPhone,
        password: password
      };

      localStorage.setItem('mednexa_users', JSON.stringify([...existingUsers, newUser]));
      setLoading(false);
      alert('Account created successfully! Please sign in.');
      navigate('/login');
    }, 300);
  };

  const handleSendOtp = () => {
    const contactTarget = emailOrPhone || 'user@mednexa.com';
    const mockOtp = '123456';
    
    setEmailOrPhone(contactTarget);
    setOtpSent(true);
    setDevOtpHint(mockOtp);
    alert(`OTP sent successfully! (Dev OTP: ${mockOtp})`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === devOtpHint || otp === '123456') {
      const mockUser = { id: Date.now(), name: fullName || 'Valued User', email: emailOrPhone };
      localStorage.setItem('token', 'mock-jwt-token-local');
      localStorage.setItem('user', JSON.stringify(mockUser));
      alert('OTP verified successfully! Welcome to MedNexa.');
      navigate('/');
    } else {
      alert('Invalid OTP. Please enter 123456.');
    }
  };

  const handleGoogleAuth = () => {
    const googleUser = { id: Date.now(), name: 'Google User', email: 'googleuser@mednexa.com' };
    localStorage.setItem('token', 'mock-google-token-local');
    localStorage.setItem('user', JSON.stringify(googleUser));
    alert('Signed in with Google successfully!');
    navigate('/');
  };

  const styles = {
    pageWrapper: {
      minHeight: '100vh',
      backgroundColor: '#090d16',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '100px',
      paddingBottom: '40px',
      paddingLeft: '16px',
      paddingRight: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      backgroundColor: '#0f172a',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      padding: '32px',
      width: '100%',
      maxWidth: '420px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      color: '#ffffff',
      boxSizing: 'border-box'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      textAlign: 'center',
      margin: '0 0 6px 0',
      color: '#ffffff'
    },
    subtitle: {
      fontSize: '14px',
      color: '#94a3b8',
      textAlign: 'center',
      margin: '0 0 24px 0'
    },
    fieldGroup: {
      marginBottom: '16px',
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#cbd5e1',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '10px',
      color: '#ffffff',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    primaryBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0284c7',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '8px'
    },
    dividerRow: {
      display: 'flex',
      alignItems: 'center',
      margin: '20px 0',
      gap: '10px'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: '#1e293b'
    },
    dividerText: {
      fontSize: '11px',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    otpBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '10px',
      color: '#38bdf8',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    },
    googleContainer: {
      width: '100%',
      marginTop: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    },
    fallbackGoogleBtn: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '10px',
      color: '#cbd5e1',
      fontSize: '12px',
      cursor: 'pointer'
    },
    footerText: {
      textAlign: 'center',
      fontSize: '12px',
      color: '#94a3b8',
      marginTop: '24px',
      margin: '24px 0 0 0'
    },
    link: {
      color: '#38bdf8',
      cursor: 'pointer',
      fontWeight: '500',
      textDecoration: 'underline'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create MedNexa Account</h2>
        <p style={styles.subtitle}>Join our enterprise healthcare portal today.</p>

        {!otpSent ? (
          <form onSubmit={handleRegister}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name" 
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address or Phone Number</label>
              <input 
                type="text" 
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="name@example.com or +91..." 
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                style={styles.input}
              />
            </div>

            <button type="submit" disabled={loading} style={styles.primaryBtn}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div style={styles.dividerRow}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>Or verify instantly</span>
              <div style={styles.dividerLine}></div>
            </div>

            <button type="button" onClick={handleSendOtp} style={styles.otpBtn}>
              📱 Continue with OTP Verification
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '10px', textAlign: 'center', marginBottom: '16px' }}>
              <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '0 0 4px 0' }}>Enter 6-digit OTP sent to</p>
              <p style={{ fontSize: '14px', color: '#38bdf8', fontWeight: '600', margin: 0 }}>{emailOrPhone}</p>
              {devOtpHint && (
                <p style={{ fontSize: '12px', color: '#4ade80', fontFamily: 'monospace', marginTop: '8px', margin: '8px 0 0 0' }}>
                  🔑 [Dev Hint] OTP: {devOtpHint}
                </p>
              )}
            </div>

            <div style={styles.fieldGroup}>
              <input 
                type="text" 
                maxLength="6"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456" 
                style={{ ...styles.input, textAlign: 'center', letterSpacing: '4px', fontSize: '18px', fontFamily: 'monospace' }}
              />
            </div>

            <button type="submit" style={{ ...styles.primaryBtn, backgroundColor: '#059669' }}>
              Verify & Complete Sign In
            </button>

            <button 
              type="button" 
              onClick={() => setOtpSent(false)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', width: '100%', marginTop: '12px', cursor: 'pointer' }}
            >
              ← Back to standard registration
            </button>
          </form>
        )}

        <div style={styles.googleContainer}>
          <button type="button" onClick={handleGoogleAuth} style={styles.fallbackGoogleBtn}>
            ⚡ Sign in with Google (Local Demo)
          </button>
        </div>

        <p style={styles.footerText}>
          Already have an account? <span onClick={() => navigate('/login')} style={styles.link}>Sign In</span>
        </p>
      </div>
    </div>
  );
}