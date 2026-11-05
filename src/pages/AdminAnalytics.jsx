import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminAnalytics() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#ffffff' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', padding: '2.5rem', borderRadius: '24px', color: '#fff', marginBottom: '2.5rem', boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.5px' }}>
            EXECUTIVE METRICS
          </span>
          <h2 style={{ fontSize: '2.3rem', fontWeight: '800', marginTop: '0.6rem', letterSpacing: '-0.5px' }}>
            Admin Financial & Clinical Analytics
          </h2>
          <p style={{ color: '#e0f2fe', fontSize: '1rem', marginTop: '0.4rem', maxWidth: '700px' }}>
            Real-time revenue monitoring, doctor utilization, and active patient queues in ₹.
          </p>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.8rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ width: '10px', height: '10px', backgroundColor: '#4ade80', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }}></span>
          <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#f8fafc' }}>System Status: All Services Operational</span>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        {/* Card 1 */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '1.8rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Monthly Revenue</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f8fafc', margin: '0.5rem 0 0.3rem 0' }}>₹1,84,500</h3>
          <p style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: '700' }}>↑ +14.2% from last month</p>
        </div>

        {/* Card 2 */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '1.8rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Total Consultations</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f8fafc', margin: '0.5rem 0 0.3rem 0' }}>342</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Across 6 clinical departments</p>
        </div>

        {/* Card 3 */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '1.8rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Verified Doctors</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f8fafc', margin: '0.5rem 0 0.3rem 0' }}>18</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Active on platform queue</p>
        </div>

        {/* Card 4 */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px', padding: '1.8rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#a855f7', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Pharmacy Fulfillment</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f8fafc', margin: '0.5rem 0 0.3rem 0' }}>98.4%</h3>
          <p style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: '700' }}>On-time medication dispatch</p>
        </div>

      </div>

      {/* Bottom Layout: Revenue Breakdown & Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Department Revenue Breakdown */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#f8fafc', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📊 Revenue Breakdown by Department
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Dept 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '700' }}>
                <span style={{ color: '#f8fafc' }}>Cardiology & Heart Care</span>
                <span style={{ color: '#38bdf8' }}>₹72,000</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: '#0284c7', borderRadius: '5px' }}></div>
              </div>
            </div>

            {/* Dept 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '700' }}>
                <span style={{ color: '#f8fafc' }}>Neurology & Brain Sciences</span>
                <span style={{ color: '#38bdf8' }}>₹54,000</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#2563eb', borderRadius: '5px' }}></div>
              </div>
            </div>

            {/* Dept 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: '700' }}>
                <span style={{ color: '#f8fafc' }}>Orthopedics & Joint Surgery</span>
                <span style={{ color: '#38bdf8' }}>₹38,500</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: '#16a34a', borderRadius: '5px' }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Management Shortcuts */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#f8fafc', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚙️ Management Shortcuts
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div 
              onClick={() => navigate('/doctors')}
              style={{ padding: '1.2rem', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', cursor: 'pointer', transition: 'background 0.2s' }}
            >
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f8fafc' }}>👩‍⚕️ Manage Doctor Accounts →</h4>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>Update schedules and department listings.</p>
            </div>

            <div 
              onClick={() => navigate('/pharmacy')}
              style={{ padding: '1.2rem', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', cursor: 'pointer' }}
            >
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f8fafc' }}>💊 Audit Pharmacy Inventory →</h4>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>Check active stock levels and fulfillment logs.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}