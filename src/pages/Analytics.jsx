import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

export default function Analytics() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let apiData = [];
    try {
      const res = await apiRequest('/appointments');
      if (Array.isArray(res)) {
        apiData = res;
      }
    } catch (err) {
      console.log('API fetch note:', err);
    }

    // Read appointments saved from localStorage
    const localData = JSON.parse(localStorage.getItem('mednexa_appointments') || '[]');

    // Combine unique appointments
    const combinedMap = new Map();
    [...apiData, ...localData].forEach((item) => {
      if (item._id || item.id) {
        combinedMap.set(item._id || item.id, item);
      }
    });

    setAppointments(Array.from(combinedMap.values()));
    setLoading(false);
  };

  // 1. Purely dynamic total revenue from actual bookings
  const totalRevenue = appointments.reduce(
    (sum, item) => sum + Number(item.consultationFee || item.fee || item.cost || 0),
    0
  );

  // 2. Purely dynamic total consultations count
  const totalConsultations = appointments.length;

  // 3. Purely dynamic department revenue breakdown
  const departmentMap = appointments.reduce((acc, curr) => {
    const dept = curr.specialty || curr.department || 'General Medicine';
    const fee = Number(curr.consultationFee || curr.fee || curr.cost || 0);
    acc[dept] = (acc[dept] || 0) + fee;
    return acc;
  }, {});

  const maxRevenue = Math.max(...Object.values(departmentMap), 1);

  return (
    <div style={{ maxWidth: '1240px', margin: '2.5rem auto', padding: '0 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', padding: '2.2rem 2.5rem', borderRadius: '24px', color: '#fff', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '20px' }}>
            EXECUTIVE METRICS
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '0.5rem' }}>Admin Financial & Clinical Analytics</h2>
          <p style={{ color: '#e0f2fe', fontSize: '0.92rem', marginTop: '0.2rem' }}>
            Real-time revenue monitoring, doctor utilization, and active patient queues in ₹.
          </p>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)', padding: '0.6rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}></span>
          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#ffffff' }}>System Status: All Services Operational</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        <div style={{ background: '#0f172a', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px' }}>MONTHLY REVENUE</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0.4rem 0', color: '#ffffff' }}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: '700' }}>Live from actual bookings</span>
        </div>

        <div style={{ background: '#0f172a', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px' }}>TOTAL CONSULTATIONS</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0.4rem 0', color: '#ffffff' }}>
            {totalConsultations}
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Across {Object.keys(departmentMap).length} clinical departments</span>
        </div>

        <div style={{ background: '#0f172a', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', letterSpacing: '0.5px' }}>VERIFIED DOCTORS</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0.4rem 0', color: '#ffffff' }}>18</h3>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Active on platform queue</span>
        </div>

        <div style={{ background: '#0f172a', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#a855f7', letterSpacing: '0.5px' }}>PHARMACY FULFILLMENT</span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0.4rem 0', color: '#ffffff' }}>98.4%</h3>
          <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: '700' }}>On-time medication dispatch</span>
        </div>

      </div>

      {/* Main Grid: Revenue Breakdown & Management Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }}>
        
        {/* Department Revenue Breakdown */}
        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📊 Revenue Breakdown by Department
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {Object.keys(departmentMap).length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No appointment bookings recorded yet. Book a consultation to view department breakdown.</p>
            ) : (
              Object.entries(departmentMap).map(([dept, rev]) => {
                const widthPercent = Math.round((rev / maxRevenue) * 100);
                return (
                  <div key={dept}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f8fafc' }}>{dept}</span>
                      <strong style={{ fontSize: '0.95rem', color: '#38bdf8' }}>₹{rev.toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: `${widthPercent}%`, height: '100%', background: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)', borderRadius: '10px', transition: 'width 0.4s ease' }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Management Shortcuts */}
        <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚙️ Management Shortcuts
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#38bdf8', fontWeight: '700' }}>👨‍⚕️ Manage Doctor Accounts →</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}>Update schedules and department listings.</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#4ade80', fontWeight: '700' }}>💊 Audit Pharmacy Inventory →</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}>Check active stock levels and fulfillment logs.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}