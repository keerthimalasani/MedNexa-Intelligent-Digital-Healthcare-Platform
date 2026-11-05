import React, { useState } from 'react';

export default function DoctorPortal() {
  const [selectedPatient, setSelectedPatient] = useState({
    name: 'Ananya Sharma',
    age: 28,
    gender: 'Female',
    symptoms: 'Severe migraine & dizziness',
    bp: '120/80 mmHg'
  });
  
  const [prescriptionText, setPrescriptionText] = useState(
    '1. Tab. Paracetamol 650mg - 1-0-1 (5 Days)\n2. Tab. Pantoprazole 40mg - 1-0-0 (Before Breakfast)'
  );

  const patients = [
    { id: 1, name: 'Ramesh Kumar', age: 42, gender: 'Male', symptoms: 'Persistent chest tightness & fatigue', bp: '135/85 mmHg', status: 'Waiting', statusColor: '#d97706' },
    { id: 2, name: 'Ananya Sharma', age: 28, gender: 'Female', symptoms: 'Severe migraine & dizziness', bp: '120/80 mmHg', status: 'In Consultation', statusColor: '#0284c7' }
  ];

  const handlePublish = () => {
    alert(`Prescription successfully published & sent to pharmacy for ${selectedPatient.name}!`);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#ffffff' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', padding: '2.5rem', borderRadius: '24px', color: '#fff', marginBottom: '2.5rem', boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px' }}>
          DOCTOR WORKSTATION
        </span>
        <h2 style={{ fontSize: '2.3rem', fontWeight: '800', marginTop: '0.6rem', letterSpacing: '-0.5px' }}>Clinical Consultation Portal</h2>
        <p style={{ color: '#e0f2fe', fontSize: '1rem', marginTop: '0.4rem', maxWidth: '700px' }}>
          Review incoming patient queues, inspect vital signs, and log official digital prescriptions.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column: Patient Queue */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#f8fafc', marginBottom: '1.2rem' }}>
            👥 Today's Patient Queue
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {patients.map((p) => (
              <div 
                key={p.id}
                style={{ 
                  background: 'rgba(15, 23, 42, 0.75)', 
                  backdropFilter: 'blur(16px)', 
                  border: selectedPatient.name === p.name ? '2px solid #0284c7' : '1px solid rgba(255, 255, 255, 0.12)', 
                  borderRadius: '20px', 
                  padding: '1.8rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.8rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: '800' }}>
                    {p.name} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '600' }}>({p.age}y / {p.gender})</span>
                  </h4>
                  <span style={{ background: p.statusColor, color: '#fff', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '6px' }}>
                    {p.status}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                  <b>Reported Symptoms:</b> {p.symptoms}
                </p>
                <p style={{ fontSize: '0.88rem', color: '#38bdf8', fontWeight: '700' }}>
                  🩺 Recorded BP: {p.bp}
                </p>

                <button 
                  onClick={() => setSelectedPatient(p)}
                  style={{ 
                    alignSelf: 'flex-start',
                    background: selectedPatient.name === p.name ? '#16a34a' : 'rgba(2, 132, 199, 0.2)', 
                    color: selectedPatient.name === p.name ? '#fff' : '#38bdf8', 
                    border: selectedPatient.name === p.name ? 'none' : '1px solid rgba(56, 189, 248, 0.4)', 
                    padding: '0.6rem 1.2rem', 
                    borderRadius: '10px', 
                    fontWeight: '700', 
                    cursor: 'pointer', 
                    fontSize: '0.88rem',
                    marginTop: '0.4rem'
                  }}
                >
                  {selectedPatient.name === p.name ? '✓ Currently Selected for Prescription' : 'Select for Prescription →'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Prescription Writer */}
        <div>
          <div 
            style={{ 
              background: 'rgba(15, 23, 42, 0.85)', 
              backdropFilter: 'blur(16px)', 
              border: '1px solid rgba(255, 255, 255, 0.15)', 
              borderRadius: '24px', 
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f8fafc', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📝 Issue Clinical Prescription
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: '600', marginBottom: '1.5rem' }}>
              Currently writing for: <span style={{ color: '#fff', fontWeight: '800' }}>{selectedPatient.name}</span>
            </p>

            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>
              Medications & Dosages
            </label>
            <textarea
              rows="6"
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                borderRadius: '14px', 
                border: '1px solid rgba(255, 255, 255, 0.2)', 
                outline: 'none', 
                background: 'rgba(255, 255, 255, 0.05)', 
                color: '#f8fafc',
                fontSize: '0.95rem',
                fontFamily: 'monospace',
                resize: 'vertical',
                marginBottom: '1.5rem'
              }}
            />

            <button 
              onClick={handlePublish}
              style={{ 
                width: '100%', 
                background: '#16a34a', 
                color: '#fff', 
                border: 'none', 
                padding: '0.95rem', 
                borderRadius: '12px', 
                fontWeight: '800', 
                fontSize: '1rem', 
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(22, 163, 74, 0.4)'
              }}
            >
              Publish & Send to Pharmacy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}