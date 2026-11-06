import React, { useState, useEffect } from 'react';

const DOCTORS_CREDENTIALS = [
  { name: 'Dr. Smith (General Medicine)', pin: '1234' },
  { name: 'Dr. Johnson (Cardiology)', pin: '1234' },
  { name: 'Dr. Williams (Pediatrics)', pin: '1234' },
  { name: 'Dr. Robert Davis (Neurology)', pin: '1234' },
  { name: 'Dr. Emily Martinez (Orthopedics)', pin: '1234' },
  { name: 'Dr. Michael Brown (Dermatology)', pin: '1234' }
];

export default function DoctorPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedDoctor, setLoggedDoctor] = useState(DOCTORS_CREDENTIALS[0].name);
  const [pinInput, setPinInput] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('patientAppointments') || '[]');
    setAppointments(stored);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const doc = DOCTORS_CREDENTIALS.find(d => d.name === loggedDoctor);
    if (doc && doc.pin === pinInput) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid PIN. Please try again (Default PIN is 1234).');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPinInput('');
  };

  const doctorPatients = appointments.filter(p => p.doctor === loggedDoctor);

  const styles = {
    pageWrapper: { minHeight: '100vh', backgroundColor: '#090d16', padding: '100px 20px 40px 20px', fontFamily: 'system-ui, sans-serif', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    container: { width: '100%', maxWidth: '900px' },
    loginCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxWidth: '450px', margin: '40px auto', width: '100%' },
    title: { fontSize: '22px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: '#94a3b8', marginBottom: '24px' },
    fieldGroup: { marginBottom: '16px', display: 'flex', flexDirection: 'column' },
    label: { fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' },
    select: { width: '100%', padding: '12px 16px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none' },
    input: { width: '100%', padding: '12px 16px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
    primaryBtn: { width: '100%', padding: '12px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
    secondaryBtn: { padding: '8px 16px', backgroundColor: '#334155', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
    headerCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
    badge: { backgroundColor: '#0284c7', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' },
    tableCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
    th: { borderBottom: '1px solid #334155', padding: '12px', color: '#94a3b8', fontWeight: '600' },
    td: { borderBottom: '1px solid #1e293b', padding: '12px', color: '#cbd5e1' }
  };

  // If not logged in, show Doctor Login Screen
  if (!isLoggedIn) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.loginCard}>
          <h2 style={styles.title}>Doctor Portal Login</h2>
          <p style={styles.subtitle}>Select your profile and enter your access PIN to view your patients.</p>
          
          <form onSubmit={handleLogin}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Select Doctor Profile</label>
              <select 
                value={loggedDoctor} 
                onChange={(e) => setLoggedDoctor(e.target.value)} 
                style={styles.select}
              >
                {DOCTORS_CREDENTIALS.map((doc, idx) => (
                  <option key={idx} value={doc.name}>{doc.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Access PIN</label>
              <input 
                type="password" 
                placeholder="Enter 4-digit PIN" 
                value={pinInput} 
                onChange={(e) => setPinInput(e.target.value)} 
                required 
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.primaryBtn}>Login to Portal</button>
          </form>
        </div>
      </div>
    );
  }

  // Once logged in, show their personalized dashboard & patient count
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        <div style={styles.headerCard}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff' }}>Welcome, {loggedDoctor}</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0' }}>Viewing your assigned appointments and patient records</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={styles.badge}>
              Patients: {doctorPatients.length}
            </div>
            <button onClick={handleLogout} style={styles.secondaryBtn}>Logout</button>
          </div>
        </div>

        <div style={styles.tableCard}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>
            Appointments for {loggedDoctor}
          </h3>

          {doctorPatients.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No patients booked with you yet.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient Name</th>
                  <th style={styles.th}>Age / Gender</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Symptoms</th>
                  <th style={styles.th}>Medical History</th>
                  <th style={styles.th}>Booked Time</th>
                </tr>
              </thead>
              <tbody>
                {doctorPatients.map((p) => (
                  <tr key={p.id}>
                    <td style={{ ...styles.td, fontWeight: '600', color: '#fff' }}>{p.name}</td>
                    <td style={styles.td}>{p.age} yrs / {p.gender}</td>
                    <td style={styles.td}>{p.contact}</td>
                    <td style={styles.td}>{p.symptoms || 'None'}</td>
                    <td style={styles.td}>{p.medicalHistory || 'None'}</td>
                    <td style={styles.td}>{p.bookedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}