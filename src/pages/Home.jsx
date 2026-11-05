import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#090d16', 
      color: '#ffffff', 
      padding: '120px 40px 40px 40px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      
      {/* Inline CSS Keyframe Animations & Hover Effects */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes floatCard {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(2, 132, 199, 0); }
            100% { box-shadow: 0 0 0 0 rgba(2, 132, 199, 0); }
          }
          .animate-fade {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-float {
            animation: floatCard 4s ease-in-out infinite;
          }
          .hover-glow:hover {
            border-color: #38bdf8 !important;
            box-shadow: 0 10px 30px -10px rgba(56, 189, 248, 0.3);
            transform: translateY(-3px);
            transition: all 0.3s ease;
          }
        `}
      </style>

      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Column: Animated Hero Content */}
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(2, 132, 199, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '6px 14px', borderRadius: '20px', width: 'fit-content' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', animation: 'pulseGlow 2s infinite' }}></span>
            <span style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.5px' }}>NEXT-GEN HOSPITAL MANAGEMENT</span>
          </div>

          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', color: '#f8fafc', letterSpacing: '-1px' }}>
            Advanced Clinical Care, <br />
            <span style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Streamlined for You.
            </span>
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '520px' }}>
            MedNexa connects patients with certified medical specialists across India. Experience real-time appointment booking, AI-driven symptom triage, and instant PDF prescription downloads.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button 
              onClick={() => navigate('/doctors')}
              className="hover-glow"
              style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.9rem 1.8rem', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)' }}
            >
              Browse Specialists →
            </button>
            <button 
              onClick={() => navigate('/ai-assistant')}
              className="hover-glow"
              style={{ background: 'rgba(15, 23, 42, 0.8)', color: '#cbd5e1', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.9rem 1.8rem', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' }}
            >
              ✨ Try AI Triage Guide
            </button>
          </div>

          {/* Stats Footer */}
          <div style={{ display: 'flex', gap: '3rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>50+</h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '4px 0 0 0' }}>Verified Doctors</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>100%</h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '4px 0 0 0' }}>Digital Records</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}>24/7</h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '4px 0 0 0' }}>AI Symptom Support</p>
            </div>
          </div>

        </div>

        {/* Right Column: Floating Ecosystem Card */}
        <div className="animate-float" style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.7rem', fontWeight: '800', padding: '4px 10px', borderRadius: '6px' }}>DIGITAL HEALTH PLATFORM</span>
            <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '700' }}>● Live MongoDB DB</span>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f8fafc', marginBottom: '1.5rem' }}>MedNexa Ecosystem</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div 
              onClick={() => navigate('/doctors')}
              className="hover-glow" 
              style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
            >
              <h4 style={{ fontSize: '0.95rem', color: '#38bdf8', fontWeight: '700', margin: '0 0 4px 0' }}>🔐 JWT Encrypted Role Access →</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>Separated access control for Patients & Doctors.</p>
            </div>

            <div 
              onClick={() => navigate('/lab-tests')}
              className="hover-glow" 
              style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
            >
              <h4 style={{ fontSize: '0.95rem', color: '#4ade80', fontWeight: '700', margin: '0 0 4px 0' }}>📄 Instant PDF Prescription Receipts →</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>Client-side HTML2PDF prescription generation.</p>
            </div>

            <div 
              onClick={() => navigate('/pharmacy')}
              className="hover-glow" 
              style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
            >
              <h4 style={{ fontSize: '0.95rem', color: '#fbbf24', fontWeight: '700', margin: '0 0 4px 0' }}>📊 Admin Financial Analytics →</h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>Live consultation tracking & hospital revenue stats in ₹.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}