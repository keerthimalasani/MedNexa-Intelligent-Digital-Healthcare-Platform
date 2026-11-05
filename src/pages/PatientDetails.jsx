import React, { useState, useEffect } from 'react';
import { apiRequest } from '../api/api';

export default function PatientDetails() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    symptoms: '',
    medicalHistory: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch patients list on component load
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await apiRequest('/patients', { method: 'GET' });
      if (data.success || Array.isArray(data)) {
        setPatients(data.patients || data);
      }
    } catch (err) {
      console.error('Error fetching patients:', err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiRequest('/patients', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      if (data.success || data._id) {
        alert('Patient details added successfully!');
        setFormData({
          name: '',
          age: '',
          gender: 'Male',
          contact: '',
          symptoms: '',
          medicalHistory: ''
        });
        fetchPatients(); // Refresh table list
      } else {
        alert(data.message || 'Failed to save patient details.');
      }
    } catch (err) {
      alert(err.message || 'Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    pageWrapper: {
      minHeight: '100vh',
      backgroundColor: '#090d16',
      padding: '100px 20px 40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    container: {
      width: '100%',
      maxWidth: '800px'
    },
    card: {
      backgroundColor: '#0f172a',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      padding: '28px',
      marginBottom: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    title: {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '6px',
      color: '#ffffff'
    },
    subtitle: {
      fontSize: '14px',
      color: '#94a3b8',
      marginBottom: '20px'
    },
    gridRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
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
    select: {
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
    textarea: {
      width: '100%',
      padding: '12px 16px',
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '10px',
      color: '#ffffff',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
      resize: 'vertical',
      minHeight: '80px'
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
    tableCard: {
      backgroundColor: '#0f172a',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      padding: '24px',
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left',
      fontSize: '14px'
    },
    th: {
      borderBottom: '1px solid #334155',
      padding: '12px',
      color: '#94a3b8',
      fontWeight: '600'
    },
    td: {
      borderBottom: '1px solid #1e293b',
      padding: '12px',
      color: '#cbd5e1'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        {/* Patient Entry Form */}
        <div style={styles.card}>
          <h2 style={styles.title}>Patient Registration & Details</h2>
          <p style={styles.subtitle}>Enter patient name, age, symptoms, and clinical records.</p>
          
          <form onSubmit={handleSubmit}>
            <div style={styles.gridRow}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Patient Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe" 
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Age</label>
                <input 
                  type="number" 
                  name="age"
                  required
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 32" 
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.gridRow}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  style={styles.select}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Contact Number / Email</label>
                <input 
                  type="text" 
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Phone or email" 
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Current Symptoms</label>
              <input 
                type="text" 
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="e.g. Fever, cough, headache" 
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Medical History / Notes</label>
              <textarea 
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="Any past illnesses, allergies, or medications..."
                style={styles.textarea}
              />
            </div>

            <button type="submit" disabled={loading} style={styles.primaryBtn}>
              {loading ? 'Saving Patient Details...' : 'Save Patient Record'}
            </button>
          </form>
        </div>

        {/* Patients Records Table */}
        <div style={styles.tableCard}>
          <h3 style={{ ...styles.title, fontSize: '18px', marginBottom: '16px' }}>Registered Patients List</h3>
          {fetching ? (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Loading patient records...</p>
          ) : patients.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No patient records found yet.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Age/Gender</th>
                  <th style={styles.th}>Contact</th>
                  <th style={styles.th}>Symptoms</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, index) => (
                  <tr key={p._id || index}>
                    <td style={{ ...styles.td, fontWeight: '600', color: '#ffffff' }}>{p.name}</td>
                    <td style={styles.td}>{p.age} yrs / {p.gender}</td>
                    <td style={styles.td}>{p.contact}</td>
                    <td style={styles.td}>{p.symptoms || 'None'}</td>
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