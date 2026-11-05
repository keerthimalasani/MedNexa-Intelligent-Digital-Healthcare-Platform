import React from 'react';
export default function PatientGuide() {
  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '2.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h2>Patient Guide & Hospital Rules</h2>
      <ol style={{ marginTop: '1rem', lineHeight: '1.8', color: '#475569', paddingLeft: '1.2rem' }}>
        <li><b>Appointments:</b> Arrive 15 minutes prior to your scheduled consultation slot.</li>
        <li><b>Documentation:</b> Carry a valid photo ID and past medical prescriptions.</li>
        <li><b>Visiting Hours:</b> General ward visiting hours are strictly 5:00 PM to 7:00 PM.</li>
        <li><b>Payments:</b> Consultation fees are accepted securely in ₹ via UPI, cards, or cash at the desk.</li>
      </ol>
    </div>
  );
}