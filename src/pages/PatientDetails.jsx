import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

export default function PatientDetails() {
  const [patient, setPatient] = useState({ name: '', patientId: '', email: '', bloodGroup: '', emergencyContact: '', medicalHistory: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/users/profile')
      .then(data => setPatient(data))
      .catch(() => setError('Please sign in to view your patient profile details.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest('/users/profile', 'PUT', patient);
      setPatient(res.user);
      setIsEditing(false);
      alert('Patient details successfully updated!');
    } catch (err) {
      alert(err.message || 'Failed to update details.');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Loading profile...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '4rem', color: '#dc2626' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '750px', margin: '2.5rem auto', padding: '2rem', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
        <div>
          <h2>Patient Profile & Records</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Secure digital medical ID and history management.</p>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} style={{ padding: '0.6rem 1.2rem', background: isEditing ? '#64748b' : '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.88rem' }}>
          {isEditing ? 'Cancel' : '✏️ Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" name="name" placeholder="Full Name" value={patient.name || ''} onChange={e => setPatient({...patient, name: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <input type="text" name="patientId" placeholder="Patient ID" value={patient.patientId || ''} onChange={e => setPatient({...patient, patientId: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <input type="email" name="email" placeholder="Email Address" value={patient.email || ''} onChange={e => setPatient({...patient, email: e.target.value})} required style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <select name="bloodGroup" value={patient.bloodGroup || ''} onChange={e => setPatient({...patient, bloodGroup: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
          </select>
          <input type="text" name="emergencyContact" placeholder="Emergency Contact Number" value={patient.emergencyContact || ''} onChange={e => setPatient({...patient, emergencyContact: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <textarea name="medicalHistory" placeholder="Medical History / Allergies" rows="3" value={patient.medicalHistory || ''} onChange={e => setPatient({...patient, medicalHistory: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <button type="submit" style={{ padding: '0.8rem', background: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>💾 Save Changes</button>
        </form>
      ) : (
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', lineHeight: '2' }}>
          <p><b>Full Name:</b> {patient.name}</p>
          <p><b>Patient ID:</b> {patient.patientId}</p>
          <p><b>Email Address:</b> {patient.email}</p>
          <p><b>Blood Group:</b> {patient.bloodGroup}</p>
          <p><b>Emergency Contact:</b> {patient.emergencyContact}</p>
          <h4 style={{ marginTop: '1.2rem', color: '#0284c7' }}>Clinical History & Notes</h4>
          <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '0.3rem' }}>{patient.medicalHistory}</p>
        </div>
      )}
    </div>
  );
}