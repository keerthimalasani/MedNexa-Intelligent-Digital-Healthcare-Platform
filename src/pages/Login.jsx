import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('mednexa_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (user || (email && password)) {
        const userData = user || { id: Date.now(), name: 'Valued User', email };
        localStorage.setItem('token', 'mock-jwt-token-local');
        localStorage.setItem('user', JSON.stringify(userData));
        alert('Signed in successfully!');
        navigate('/');
      } else {
        alert('Invalid email or password. Please check your credentials or register.');
      }
      setLoading(false);
    }, 300);
  };

  const handleMockOtpLogin = () => {
    const userData = { id: Date.now(), name: 'OTP User', email: email || 'user@mednexa.com' };
    localStorage.setItem('token', 'mock-jwt-token-local');
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Signed in via OTP successfully!');
    navigate('/');
  };

  const handleGoogleLogin = () => {
    const userData = { id: Date.now(), name: 'Google User', email: 'googleuser@mednexa.com' };
    localStorage.setItem('token', 'mock-google-token-local');
    localStorage.setItem('user', JSON.stringify(userData));
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
    googleBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '10px',
      color: '#cbd5e1',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '12px'
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
        <h2 style={styles.title}>Sign In to MedNexa</h2>
        <p style={styles.subtitle}>Access your patient or doctor portal.</p>

        <form onSubmit={handleLogin}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" 
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
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div style={styles.dividerRow}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>Alternative Options</span>
            <div style={styles.dividerLine}></div>
          </div>

          <button type="button" onClick={handleMockOtpLogin} style={styles.otpBtn}>
            📱 Sign In with OTP
          </button>

          <button type="button" onClick={handleGoogleLogin} style={styles.googleBtn}>
            ⚡ Sign in with Google
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <span onClick={() => navigate('/register')} style={styles.link}>Register</span>
        </p>
      </div>
    </div>
  );
}