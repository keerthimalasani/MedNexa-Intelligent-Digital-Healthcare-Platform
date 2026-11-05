import React, { useState } from 'react';

export default function Help() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) {
      alert('Please fill in both subject and message.');
      return;
    }
    setSubmitted(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '2.5rem auto', padding: '0 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', padding: '2.2rem 2.5rem', borderRadius: '24px', color: '#fff', marginBottom: '2rem' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '20px' }}>
          SUPPORT & ASSISTANCE
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '0.5rem' }}>Help Center & Patient Guide</h2>
        <p style={{ color: '#e0f2fe', fontSize: '0.92rem', marginTop: '0.2rem' }}>
          Find answers to common questions about doctor bookings, pharmacy orders, or reach out to our clinical support team.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
        
        {/* FAQs Section */}
        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ❓ Frequently Asked Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '0.98rem', color: '#38bdf8' }}>How do I book a specialist consultation?</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
                Navigate to the <b>Doctors</b> page, select your preferred specialist, fill in your patient name and appointment date, and click "Pay & Confirm Booking". Your appointment and consultation fee will automatically reflect in your analytics dashboard.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '0.98rem', color: '#38bdf8' }}>Are consultation fees and analytics updated in real time?</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
                Yes! MedNexa utilizes synchronized application storage. Whenever you book an appointment, your revenue metrics and department breakdowns on the <b>Analytics</b> page update instantly.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '0.98rem', color: '#38bdf8' }}>How can I track pharmacy fulfillment or lab tests?</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
                You can access pharmacy dispatches and diagnostic lab test reports directly from the navigation bar under <b>Pharmacy & Vitals</b> or <b>Lab Tests</b>.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Support Ticket */}
        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ✉️ Contact Clinical Support
          </h3>

          {submitted ? (
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #4ade80', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', color: '#4ade80' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>Support Ticket Submitted!</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1' }}>Our administrative team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>Subject / Issue</label>
                <input 
                  type="text" 
                  value={ticketSubject} 
                  onChange={(e) => setTicketSubject(e.target.value)} 
                  placeholder="e.g., Payment or Booking Issue" 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.9rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>Message Details</label>
                <textarea 
                  rows="4" 
                  value={ticketMessage} 
                  onChange={(e) => setTicketMessage(e.target.value)} 
                  placeholder="Describe your issue in detail..." 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.9rem', resize: 'vertical' }} 
                ></textarea>
              </div>

              <button 
                type="submit" 
                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '10px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s ease', marginTop: '0.5rem' }}
              >
                Send Support Request
              </button>
            </form>
          )}

          <div style={{ marginTop: '1.8rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.2rem' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '0.82rem', color: '#94a3b8' }}><b>Emergency Helpline:</b> 1800-MED-NEXA</p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}><b>Email:</b> support@mednexa.health</p>
          </div>
        </div>

      </div>
    </div>
  );
}