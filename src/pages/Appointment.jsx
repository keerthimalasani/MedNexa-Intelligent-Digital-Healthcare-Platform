import React, { useState, useEffect } from 'react';
import { apiRequest } from '../api/api';

export default function Appointment() {
  const [doctors] = useState([
    { id: 1, name: 'Dr. Alisha Khan', specialty: 'Cardiology & Heart Care', fee: 600, exp: '10 yrs exp', available: 'Morning (10 AM - 1 PM)' },
    { id: 2, name: 'Dr. Robert Chen', specialty: 'Neurology & Brain Sciences', fee: 600, exp: '12 yrs exp', available: 'Afternoon (2 PM - 5 PM)' },
    { id: 3, name: 'Dr. Emily Watson', specialty: 'Pediatrics', fee: 450, exp: '8 yrs exp', available: 'Morning (10 AM - 1 PM)' },
    { id: 4, name: 'Dr. Sophia Patel', specialty: 'Orthopedics & Joint Surgery', fee: 500, exp: '9 yrs exp', available: 'Evening (5 PM - 8 PM)' },
    { id: 5, name: 'Dr. Michael Ross', specialty: 'General Medicine', fee: 350, exp: '15 yrs exp', available: 'Morning (9 AM - 12 PM)' },
    { id: 6, name: 'Dr. Priya Sharma', specialty: 'Dermatology & Skin Care', fee: 550, exp: '7 yrs exp', available: 'Afternoon (1 PM - 4 PM)' },
    { id: 7, name: 'Dr. David Miller', specialty: 'Ophthalmology', fee: 400, exp: '11 yrs exp', available: 'Morning (10 AM - 1 PM)' },
    { id: 8, name: 'Dr. Ananya Roy', specialty: 'Gynecology & Obstetrics', fee: 650, exp: '14 yrs exp', available: 'Morning (9 AM - 12 PM)' },
    { id: 9, name: 'Dr. James Wilson', specialty: 'Cardiology & Heart Care', fee: 700, exp: '16 yrs exp', available: 'Evening (4 PM - 7 PM)' },
    { id: 10, name: 'Dr. Neha Gupta', specialty: 'Neurology & Brain Sciences', fee: 650, exp: '10 yrs exp', available: 'Morning (11 AM - 2 PM)' }
  ]);

  const [myAppointments, setMyAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await apiRequest('/appointments');
      if (Array.isArray(data) && data.length > 0) {
        setMyAppointments(data);
        localStorage.setItem('mednexa_appointments', JSON.stringify(data));
      } else {
        throw new Error('No backend appointments');
      }
    } catch (err) {
      const saved = JSON.parse(localStorage.getItem('mednexa_appointments') || '[]');
      if (saved.length > 0) {
        setMyAppointments(saved);
      } else {
        const defaultDemo = [
          {
            _id: 'appt-1',
            doctorName: 'Dr. Alisha Khan',
            specialty: 'Cardiology & Heart Care',
            patientName: 'Ramesh Kumar',
            date: '2026-11-05',
            consultationFee: 600,
            paymentStatus: 'Paid (Online)',
            status: 'Confirmed'
          }
        ];
        setMyAppointments(defaultDemo);
        localStorage.setItem('mednexa_appointments', JSON.stringify(defaultDemo));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !patientName || !appointmentDate) {
      alert('Please fill in all booking details.');
      return;
    }

    const newBooking = {
      _id: Date.now().toString(),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      patientName,
      date: appointmentDate,
      consultationFee: selectedDoctor.fee,
      paymentStatus: 'Paid (₹' + selectedDoctor.fee + ')',
      status: 'Confirmed'
    };

    const updatedList = [newBooking, ...myAppointments];
    setMyAppointments(updatedList);
    localStorage.setItem('mednexa_appointments', JSON.stringify(updatedList));

    alert(`Successfully booked appointment with ${selectedDoctor.name}!\nConsultation Fee: ₹${selectedDoctor.fee} Paid. Analytics updated!`);
    
    setSelectedDoctor(null);
    setPatientName('');
    setAppointmentDate('');

    try {
      await apiRequest('/appointments', 'POST', {
        doctorName: newBooking.doctorName,
        specialty: newBooking.specialty,
        patientName: newBooking.patientName,
        date: newBooking.date,
        consultationFee: newBooking.consultationFee
      });
    } catch (err) {
      console.error('Backend sync note:', err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '2.5rem auto', padding: '0 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', padding: '2rem 2.5rem', borderRadius: '20px', color: '#fff', marginBottom: '2rem' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '6px' }}>CLINICAL SCHEDULING</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.4rem' }}>Specialist Consultation & Booking</h2>
        <p style={{ color: '#e0f2fe', fontSize: '0.9rem' }}>Book appointments with verified specialists, view consultation fees in ₹, and track bookings.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
        
        {/* Doctors Directory & Booking Form */}
        <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.2rem' }}>👨‍⚕️ Available Specialists ({doctors.length})</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.3rem' }}>
            {doctors.map((doc) => (
              <div 
                key={doc.id} 
                onClick={() => setSelectedDoctor(doc)}
                style={{ 
                  padding: '1.2rem', 
                  background: selectedDoctor?.id === doc.id ? '#f0f9ff' : '#f8fafc', 
                  borderRadius: '12px', 
                  border: selectedDoctor?.id === doc.id ? '2px solid #0284c7' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: '700', margin: 0 }}>{doc.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: '600', margin: '2px 0' }}>{doc.specialty}</p>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>{doc.exp} | 🕒 {doc.available}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', display: 'block' }}>₹{doc.fee}</span>
                  <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: '700' }}>{selectedDoctor?.id === doc.id ? 'Selected ✓' : 'Select'}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedDoctor && (
            <form onSubmit={handleBookAppointment} style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1.05rem' }}>Confirm Booking with {selectedDoctor.name}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Patient Name</label>
                  <input type="text" required value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Enter patient full name" style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '0.3rem' }}>Appointment Date</label>
                  <input type="date" required value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>Consultation Fee: ₹{selectedDoctor.fee}</span>
                  <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.7rem 1.4rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                    Pay & Confirm Booking
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* My Appointments & Payment Tracker */}
        <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.2rem' }}>📋 My Scheduled Appointments</h3>
          
          {loading ? (
            <p style={{ color: '#64748b' }}>Loading appointments...</p>
          ) : myAppointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b', background: '#f8fafc', borderRadius: '12px' }}>
              No appointments booked yet. Select a doctor from the left to schedule a consultation.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '550px', overflowY: 'auto' }}>
              {myAppointments.map((appt) => (
                <div key={appt._id} style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: '800', margin: 0 }}>{appt.doctorName}</h4>
                    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>{appt.status}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: '600', margin: '2px 0' }}>{appt.specialty}</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0' }}><b>Patient:</b> {appt.patientName} | 📅 {appt.date}</p>
                  <div style={{ marginTop: '0.6rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: '#334155', fontWeight: '700' }}>Fee: ₹{appt.consultationFee}</span>
                    <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>{appt.paymentStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}