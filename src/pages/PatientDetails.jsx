import React, { useState } from 'react';

export default function PatientDetails() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    symptoms: '',
    medicalHistory: '',
    doctor: 'Dr. Smith (General Medicine)'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newAppointment = {
        id: Date.now(),
        ...formData,
        bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const existingAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]');
      localStorage.setItem('patientAppointments', JSON.stringify([newAppointment, ...existingAppointments]));

      setFormData({
        name: '',
        age: '',
        gender: 'Male',
        contact: '',
        symptoms: '',
        medicalHistory: '',
        doctor: 'Dr. Smith (General Medicine)'
      });

      setLoading(false);
      alert('Appointment booked successfully! The doctor can now view your details.');
    }, 200);
  };

  const styles = {
    pageWrapper: { minHeight: '100vh', backgroundColor: '#090d16', padding: '100px 20px 40px 20px', fontFamily: 'system-ui, sans-serif', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    container: { width: '100%', maxWidth: '700px' },
    card: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '28px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
    title: { fontSize: '22px', fontWeight: '700', marginBottom: '6px', color: '#ffffff' },
    subtitle: { fontSize: '14px', color: '#94a3b8', marginBottom: '20px' },
    gridRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    fieldGroup: { marginBottom: '16px', display: 'flex', flexDirection: 'column' },
    label: { fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' },
    input: { width: '100%', padding: '12px 16px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
    select: { width: '100%', padding: '12px 16px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '12px 16px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px' },
    primaryBtn: { width: '100%', padding: '12px', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Book Appointment & Patient Details</h2>
          <p style={styles.subtitle}>Fill in your information to schedule your consultation.</p>
          
          <form onSubmit={handleSubmit}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Select Doctor</label>
              <select name="doctor" value={formData.doctor} onChange={handleChange} style={styles.select}>
                <option value="Dr. Smith (General Medicine)">Dr. Smith (General Medicine)</option>
                <option value="Dr. Johnson (Cardiology)">Dr. Johnson (Cardiology)</option>
                <option value="Dr. Williams (Pediatrics)">Dr. Williams (Pediatrics)</option>
                <option value="Dr. Robert Davis (Neurology)">Dr. Robert Davis (Neurology)</option>
                <option value="Dr. Emily Martinez (Orthopedics)">Dr. Emily Martinez (Orthopedics)</option>
                <option value="Dr. Michael Brown (Dermatology)">Dr. Michael Brown (Dermatology)</option>
              </select>
            </div>

            <div style={styles.gridRow}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Patient Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" style={styles.input} />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Age</label>
                <input type="number" name="age" required min="0" max="120" value={formData.age} onChange={handleChange} placeholder="e.g. 32" style={styles.input} />
              </div>
            </div>

            <div style={styles.gridRow}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} style={styles.select}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Contact Number / Email</label>
                <input type="text" name="contact" required value={formData.contact} onChange={handleChange} placeholder="Phone or email" style={styles.input} />
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Current Symptoms</label>
              <input type="text" name="symptoms" value={formData.symptoms} onChange={handleChange} placeholder="e.g. Fever, cough, headache" style={styles.input} />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Medical History / Notes</label>
              <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Any past illnesses, allergies..." style={styles.textarea} />
            </div>

            <button type="submit" disabled={loading} style={styles.primaryBtn}>
              {loading ? 'Booking Appointment...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}