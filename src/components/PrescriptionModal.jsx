import React from 'react';
import html2pdf from 'html2pdf.js';

export default function PrescriptionModal({ appointment, onClose }) {
  if (!appointment) return null;

  const handleDownloadPDF = () => {
    const element = document.getElementById('prescription-invoice');
    const opt = {
      margin:       0.5,
      filename:     `MedNexa_Receipt_${appointment._id || 'INV'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modalBox}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <button onClick={handleDownloadPDF} style={styles.downloadBtn}>📥 Download PDF</button>
          <button onClick={onClose} style={styles.closeBtn}>✕ Close</button>
        </div>

        {/* Invoice Letterhead Element */}
        <div id="prescription-invoice" style={styles.invoiceCard}>
          {/* Header */}
          <div style={styles.headerRow}>
            <div>
              <h2 style={{ color: '#0284c7', margin: 0 }}>🏥 MedNexa Healthcare</h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Advanced Clinical Care & Digital Health Services</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h4 style={{ margin: 0, color: '#0f172a' }}>OFFICIAL RECEIPT</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1rem 0' }} />

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem', color: '#334155' }}>
            <div>
              <p><b>Patient Name:</b> {appointment.userId?.name || 'Valued Patient'}</p>
              <p><b>Patient ID:</b> {appointment.userId?.patientId || 'MED-PATIENT'}</p>
              <p><b>Blood Group:</b> {appointment.userId?.bloodGroup || 'N/A'}</p>
            </div>
            <div>
              <p><b>Doctor:</b> {appointment.doctorName}</p>
              <p><b>Specialization:</b> {appointment.specialization}</p>
              <p><b>Appointment Date:</b> {appointment.appointmentDate} at {appointment.timeSlot}</p>
            </div>
          </div>

          {/* Symptoms & Prescriptions */}
          <div style={{ marginTop: '1.2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem' }}><b>Reported Symptoms:</b> {appointment.symptoms}</p>
            <h4 style={{ color: '#0284c7', marginTop: '0.8rem', marginBottom: '0.4rem' }}>💊 Clinical Prescription & Notes:</h4>
            <p style={{ fontSize: '0.9rem', color: '#0f172a', whiteSpace: 'pre-wrap' }}>
              {appointment.prescription || 'No active clinical prescription recorded yet.'}
            </p>
          </div>

          {/* Billing Breakdown */}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #0284c7', paddingTop: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Payment Status</span>
              <p style={{ color: '#059669', fontWeight: '700', margin: 0 }}>PAID (Confirmed)</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Consultation Fee</span>
              <h3 style={{ margin: 0, color: '#0f172a' }}>{appointment.fee || '₹800'}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalBox: { background: '#fff', padding: '1.5rem', borderRadius: '16px', maxWidth: '650px', width: '90%', maxHeight: '90vh', overflowY: 'auto' },
  downloadBtn: { background: '#0284c7', color: '#fff', border: 'none', padding: '0.55rem 1.2rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' },
  closeBtn: { background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.55rem 1rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  invoiceCard: { background: '#ffffff', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '12px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
};