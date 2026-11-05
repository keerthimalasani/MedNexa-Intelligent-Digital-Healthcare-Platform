import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 80px)', paddingBottom: '4rem' }}>
      
      {/* Header Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '4rem 1.5rem 3.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '20px', letterSpacing: '1px' }}>
            ABOUT MEDNEXA HEALTHCARE
          </span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginTop: '1rem', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
            Transforming Indian Healthcare Through Digital Innovation
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.7' }}>
            MedNexa bridges the gap between verified specialist care and patients across India. We combine real-time clinical workflows, automated digital prescriptions, and AI-driven triage guidance into a single unified platform.
          </p>
        </div>
      </section>

      {/* Metrics Banner */}
      <section style={{ maxWidth: '1100px', margin: '-2.5rem auto 4rem', padding: '0 1.5rem' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#0284c7', fontWeight: '800' }}>50+</h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.2rem' }}>VERIFIED SPECIALISTS</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#16a34a', fontWeight: '800' }}>10,000+</h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.2rem' }}>PATIENTS SERVED</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#7c3aed', fontWeight: '800' }}>99.9%</h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.2rem' }}>PLATFORM UPTIME</p>
          </div>
          <div>
            <h2 style={{ fontSize: '2.2rem', color: '#d97706', fontWeight: '800' }}>₹0</h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.2rem' }}>HIDDEN BOOKING FEES</p>
          </div>
        </div>
      </section>

      {/* Core Mission & Pillars */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: '800' }}>Our Core Pillars</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.3rem' }}>Built on trust, speed, and clinical safety.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <div style={{ background: '#e0f2fe', color: '#0369a1', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
              🏥
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '700', marginBottom: '0.6rem' }}>Clinical Excellence</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Every medical practitioner in our directory undergoes rigorous credential verification across major institutes (AIIMS, PGI, CMC) before offering consultations.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <div style={{ background: '#dcfce7', color: '#15803d', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '700', marginBottom: '0.6rem' }}>Real-time Infrastructure</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Powered by MongoDB and JWT technology, MedNexa delivers instant queue synchronization for doctors and instant downloadable PDF prescriptions for patients.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <div style={{ background: '#fef3c7', color: '#b45309', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
              🤖
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '700', marginBottom: '0.6rem' }}>AI Triage Assistance</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Our smart AI guide provides preliminary symptom assessment to direct patients to the correct clinical specialty quickly and safely.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ background: '#0f172a', borderRadius: '20px', padding: '3rem 2rem', color: '#ffffff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.8rem' }}>Ready to Experience Next-Gen Healthcare?</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 1.8rem' }}>
            Book your consultation with verified specialists or explore our intelligent patient guide.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/doctors" style={{ background: '#0284c7', color: '#ffffff', padding: '0.75rem 1.6rem', borderRadius: '10px', fontWeight: '700', textDecoration: 'none' }}>
              View Doctors Directory
            </Link>
            <Link to="/register" style={{ background: 'transparent', color: '#ffffff', border: '1px solid #475569', padding: '0.75rem 1.6rem', borderRadius: '10px', fontWeight: '700', textDecoration: 'none' }}>
              Create Patient Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}