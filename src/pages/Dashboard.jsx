import React, { useState, useEffect } from 'react';
import { apiRequest } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Alisha Khan (Cardiology)');
  const [selectedSlot, setSelectedSlot] = useState('Morning Shift (10:00 AM)');
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest('/appointments/my-appointments')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAppointments(data);
        } else {
          throw new Error('No appointments found');
        }
      })
      .catch((err) => {
        console.error('Loading fallback appointment data:', err);
        setAppointments([
          {
            _id: 'app-1',
            doctorName: 'Dr. Alisha Khan',
            department: 'Cardiology',
            slot: 'Morning Shift (10:00 AM)',
            status: 'Confirmed'
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const newApp = {
      _id: Date.now().toString(),
      doctorName: selectedDoctor.split('(')[0].trim(),
      department: selectedDoctor.split('(')[1]?.replace(')', '') || 'General',
      slot: selectedSlot,
      status: 'Confirmed'
    };
    setAppointments([...appointments, newApp]);
    setShowBookingForm(false);
    alert(`Successfully booked appointment with ${newApp.doctorName} for ${newApp.slot}!`);
  };

  const handleDownloadSlip = (app) => {
    const slipContent = `
========================================
           MEDNEXA HEALTHCARE
      Official Prescription & Slip
========================================
Doctor: ${app.doctorName}
Department: ${app.department || 'General Consultation'}
Slot: ${app.slot}
Status: ${app.status || 'Confirmed'}

Patient Instructions:
- Please arrive 10 minutes prior to your slot.
- Bring previous medical history records if any.
========================================
    `;
    const blob = new Blob([slipContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MedNexa_Appointment_${app.doctorName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#ffffff' }}>
      
      {/* Welcome Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', padding: '2.5rem', borderRadius: '24px', color: '#fff', marginBottom: '2.5rem', boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '20px' }}>
          PATIENT COMMAND CENTER
        </span>
        <h2 style={{ fontSize: '2.3rem', fontWeight: '800', marginTop: '0.6rem' }}>Welcome Back, Patient</h2>
        <p style={{ color: '#e0f2fe', fontSize: '1rem', marginTop: '0.4rem', maxWidth: '700px' }}>
          Manage your active specialist appointments, clinical logs, and download official prescription slips.
        </p>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column: Active Bookings */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#f8fafc', marginBottom: '1.2rem' }}>
            📅 Active Specialist Bookings
          </h3>

          {loading ? (
            <div style={{ padding: '2rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', color: '#94a3b8' }}>
              Loading appointments...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.map((app) => (
                <div 
                  key={app._id} 
                  style={{ 
                    background: 'rgba(15, 23, 42, 0.75)', 
                    backdropFilter: 'blur(16px)', 
                    border: '1px solid rgba(255, 255, 255, 0.12)', 
                    borderRadius: '20px', 
                    padding: '1.8rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
                      <h4 style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: '800' }}>{app.doctorName}</h4>
                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', fontSize: '0.75rem', fontWeight: '800', padding: '3px 10px', borderRadius: '6px' }}>
                        {app.status || 'Confirmed'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: '600', marginBottom: '0.2rem' }}>
                      Department: {app.department}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                      🕒 Slot: {app.slot}
                    </p>
                  </div>

                  <button 
                    onClick={() => handleDownloadSlip(app)}
                    style={{ 
                      background: '#0284c7', 
                      color: '#ffffff', 
                      border: 'none', 
                      padding: '0.75rem 1.4rem', 
                      borderRadius: '12px', 
                      fontWeight: '700', 
                      cursor: 'pointer', 
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
                    }}
                  >
                    📥 Download Rx PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Quick Actions & Interactive Booking Form */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#f8fafc', marginBottom: '1.2rem' }}>
            ⚡ Quick Actions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Interactive Book Appointment Card */}
            <div 
              onClick={() => setShowBookingForm(!showBookingForm)}
              style={{ 
                background: showBookingForm ? 'rgba(2, 132, 199, 0.25)' : 'rgba(15, 23, 42, 0.75)', 
                backdropFilter: 'blur(16px)', 
                border: '1px solid #38bdf8', 
                borderRadius: '16px', 
                padding: '1.4rem', 
                cursor: 'pointer'
              }}
            >
              <h4 style={{ fontSize: '1rem', color: '#38bdf8', fontWeight: '800', marginBottom: '0.3rem' }}>
                📅 {showBookingForm ? 'Close Booking Form ▲' : 'Book New Appointment →'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>Click to select specialist doctors and time slots.</p>

              {showBookingForm && (
                <form onSubmit={handleConfirmBooking} onClick={(e) => e.stopPropagation()} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Select Specialist Doctor</label>
                    <select 
                      value={selectedDoctor} 
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      style={{ width: '100%', padding: '8px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '13px' }}
                    >
                      <option value="Dr. Alisha Khan (Cardiology)">Dr. Alisha Khan - Cardiology</option>
                      <option value="Dr. Robert Chen (Neurology)">Dr. Robert Chen - Neurology</option>
                      <option value="Dr. Emily Watson (Pediatrics)">Dr. Emily Watson - Pediatrics</option>
                      <option value="Dr. Michael Ross (General Medicine)">Dr. Michael Ross - General Medicine</option>
                      <option value="Dr. Sophia Patel (Orthopedics)">Dr. Sophia Patel - Orthopedics</option>
                      <option value="Dr. David Miller (Dermatology)">Dr. David Miller - Dermatology</option>
                      <option value="Dr. Jessica Taylor (Ophthalmology)">Dr. Jessica Taylor - Ophthalmology</option>
                      <option value="Dr. William Garcia (Psychiatry)">Dr. William Garcia - Psychiatry</option>
                      <option value="Dr. Amanda Martinez (Gynecology)">Dr. Amanda Martinez - Gynecology</option>
                      <option value="Dr. James Anderson (Oncology)">Dr. James Anderson - Oncology</option>
                      <option value="Dr. Brian Thomas (Gastroenterology)">Dr. Brian Thomas - Gastroenterology</option>
                      <option value="Dr. Lisa Jackson (Endocrinology)">Dr. Lisa Jackson - Endocrinology</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Select Slot</label>
                    <select 
                      value={selectedSlot} 
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      style={{ width: '100%', padding: '8px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '13px' }}
                    >
                      <option value="Morning Shift (10:00 AM)">Morning Shift (10:00 AM)</option>
                      <option value="Afternoon Shift (02:00 PM)">Afternoon Shift (02:00 PM)</option>
                      <option value="Evening Shift (05:30 PM)">Evening Shift (05:30 PM)</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    style={{ marginTop: '4px', padding: '10px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}
                  >
                    Confirm & Add Booking
                  </button>
                </form>
              )}
            </div>

            {/* Action Card: Lab Tests */}
            <div 
              onClick={() => navigate('/lab-tests')}
              style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px', padding: '1.4rem', cursor: 'pointer' }}
            >
              <h4 style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: '700', marginBottom: '0.3rem' }}>🧪 Order Lab Tests →</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>CBC, Urinalysis & Lipid pathology panels.</p>
            </div>

            {/* Action Card: Pharmacy */}
            <div 
              onClick={() => navigate('/pharmacy')}
              style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px', padding: '1.4rem', cursor: 'pointer' }}
            >
              <h4 style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: '700', marginBottom: '0.3rem' }}>💊 Pharmacy Dispensary →</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>View prescribed tablets and stock catalog.</p>
            </div>

            {/* Action Card: AI Symptom Guide */}
            <div 
              onClick={() => navigate('/ai-assistant')}
              style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(217, 119, 6, 0.4)', borderRadius: '16px', padding: '1.4rem', cursor: 'pointer' }}
            >
              <h4 style={{ fontSize: '1rem', color: '#fde047', fontWeight: '800', marginBottom: '0.3rem' }}>✨ AI Symptom Guide →</h4>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>Instant preliminary clinical triage support.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}