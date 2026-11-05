import React, { useState, useEffect } from 'react';
import { apiRequest } from '../api/api';

export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState('pharmacy'); // 'pharmacy' | 'nurse'
  const [search, setSearch] = useState('');
  
  // Expanded Pharmacy Catalog
  const [medCatalog] = useState([
    { id: 1, name: 'Paracetamol 650mg (Dolo)', category: 'Analgesic / Antipyretic', stock: '550 Strips', price: 30, form: 'Tablet' },
    { id: 2, name: 'Amoxicillin & Potassium Clavulanate 625mg (Augmentin)', category: 'Antibiotic', stock: '220 Strips', price: 180, form: 'Tablet' },
    { id: 3, name: 'Pantoprazole 40mg (Pan-40)', category: 'Antacid / PPI', stock: '400 Strips', price: 95, form: 'Tablet' },
    { id: 4, name: 'Metformin 500mg (Glycomet)', category: 'Anti-Diabetic', stock: '650 Strips', price: 45, form: 'Tablet' },
    { id: 5, name: 'Atorvastatin 10mg (Lipivas)', category: 'Cardiology / Cholesterol', stock: '320 Strips', price: 140, form: 'Tablet' },
    { id: 6, name: 'Azithromycin 500mg (Azithral)', category: 'Antibiotic', stock: '180 Strips', price: 120, form: 'Tablet' },
    { id: 7, name: 'Ibuprofen 400mg + Paracetamol 325mg (Combiflam)', category: 'Pain Relief / Anti-inflammatory', stock: '480 Strips', price: 40, form: 'Tablet' },
    { id: 8, name: 'Cetirizine 10mg (Okacet)', category: 'Antihistamine / Allergy', stock: '700 Strips', price: 25, form: 'Tablet' },
    { id: 9, name: 'Amlodipine 5mg (Stamlo)', category: 'Hypertension / BP', stock: '390 Strips', price: 35, form: 'Tablet' },
    { id: 10, name: 'Telmisartan 40mg (Telma)', category: 'Hypertension / BP', stock: '310 Strips', price: 85, form: 'Tablet' },
    { id: 11, name: 'Levothyroxine 50mcg (Thyronorm)', category: 'Thyroid / Endocrinology', stock: '260 Bottles', price: 175, form: 'Tablet' },
    { id: 12, name: 'Montelukast 10mg + Levocetirizine (Montair LC)', category: 'Respiratory / Asthma', stock: '290 Strips', price: 160, form: 'Tablet' },
    { id: 13, name: 'Rabeprazole 20mg + Domperidone (Rabeloc D)', category: 'Gastroenterology', stock: '340 Strips', price: 110, form: 'Capsule' },
    { id: 14, name: 'Vitamin D3 60,000 IU (Uprise D3)', category: 'Nutritional Supplement', stock: '500 Sachet Packs', price: 60, form: 'Capsule' },
    { id: 15, name: 'Cefixime 200mg (Taxim-O)', category: 'Antibiotic', stock: '210 Strips', price: 135, form: 'Tablet' }
  ]);

  // Pharmacy Orders State
  const [orders, setOrders] = useState([]);

  // Nurse Form State
  const [patientName, setPatientName] = useState('');
  const [bp, setBp] = useState('120/80');
  const [hr, setHr] = useState('72');
  const [temp, setTemp] = useState('98.6');
  const [spo2, setSpo2] = useState('99');
  const [vitalsList, setVitalsList] = useState([]);

  useEffect(() => {
    loadPharmacyOrders();
  }, []);

  const loadPharmacyOrders = async () => {
    try {
      const data = await apiRequest('/pharmacy/orders');
      if (Array.isArray(data) && data.length > 0) {
        setOrders(data);
      } else {
        throw new Error('No orders found');
      }
    } catch (err) {
      console.error('Loading fallback pharmacy orders:', err);
      // Fallback Demo Orders
      setOrders([
        {
          _id: 'ord-1',
          patientName: 'Ramesh Kumar',
          doctorName: 'Dr. Alisha Khan',
          dispenseStatus: 'Pending Verification',
          totalAmount: 210
        }
      ]);
    }
  };

  const filteredMeds = medCatalog.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase()) ||
    med.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleRequestMedication = async (med) => {
    const newOrder = {
      _id: Date.now().toString(),
      patientName: 'General Outpatient',
      doctorName: 'Hospital Dispensary',
      dispenseStatus: 'Requested',
      totalAmount: med.price,
      medication: med.name
    };

    setOrders([newOrder, ...orders]);
    alert(`Successfully requested dispensary order for ${med.name} (₹${med.price})!`);

    try {
      await apiRequest('/pharmacy/orders', 'POST', {
        medicationName: med.name,
        cost: med.price
      });
    } catch (err) {
      console.error('Backend sync note:', err.message);
    }
  };

  const handleLogVitals = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      patientName,
      bloodPressure: bp,
      heartRate: `${hr} bpm`,
      temperature: `${temp} °F`,
      oxygenSaturation: `${spo2}%`,
      time: new Date().toLocaleTimeString()
    };
    setVitalsList([newEntry, ...vitalsList]);
    setPatientName('');
    alert('Patient Vitals logged successfully by Nursing Staff!');
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem 2.5rem', borderRadius: '20px', color: '#fff', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ background: 'rgba(2, 132, 199, 0.25)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '6px' }}>CLINICAL OPERATIONS HUB</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.4rem' }}>Pharmacy & Nursing Station</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Dispensary medication inventory, prescription fulfillments, and patient vital monitoring.</p>
        </div>

        {/* Workspace Switcher */}
        <div style={{ background: 'rgba(255,255,255,0.08)', padding: '4px', borderRadius: '12px', display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('pharmacy')}
            style={{
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              background: activeTab === 'pharmacy' ? '#0284c7' : 'transparent',
              color: '#ffffff'
            }}
          >
            💊 Hospital Pharmacy
          </button>
          <button
            onClick={() => setActiveTab('nurse')}
            style={{
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              background: activeTab === 'nurse' ? '#16a34a' : 'transparent',
              color: '#ffffff'
            }}
          >
            🩺 Nurse Station & Vitals
          </button>
        </div>
      </div>

      {/* PHARMACY TAB */}
      {activeTab === 'pharmacy' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
          
          {/* Pharmacy Inventory */}
          <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '800' }}>📦 Medication Stock Catalog ({filteredMeds.length})</h3>
              <input
                type="text"
                placeholder="Search tablets or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: '0.55rem 0.9rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', width: '220px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '600px', overflowY: 'auto', paddingRight: '0.3rem' }}>
              {filteredMeds.map((med) => (
                <div key={med.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '0.98rem', color: '#0f172a', fontWeight: '700' }}>{med.name}</h4>
                      <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.7rem', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>{med.form}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>Category: {med.category} | Stock: <b style={{ color: '#059669' }}>{med.stock}</b></p>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: '100px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <div>
                      <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>₹{med.price}</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>per strip</span>
                    </div>
                    <button 
                      onClick={() => handleRequestMedication(med)}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Request Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Doctor Prescriptions to Dispense */}
          <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.2rem' }}>📋 Pending Dispensary Orders</h3>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b', background: '#f8fafc', borderRadius: '12px' }}>
                No pending pharmacy orders. Prescriptions submitted by doctors will appear here automatically.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map((ord) => (
                  <div key={ord._id} style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <strong style={{ color: '#0f172a' }}>{ord.patientName}</strong>
                      <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>{ord.dispenseStatus || 'Pending'}</span>
                    </div>
                    {ord.medication && <p style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: '600', marginBottom: '0.2rem' }}>Medication: {ord.medication}</p>}
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Prescribed by: {ord.doctorName}</p>
                    <div style={{ marginTop: '0.6rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.6rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: '#334155' }}>Total Amount: ₹{ord.totalAmount}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* NURSE STATION TAB */}
      {activeTab === 'nurse' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
          
          {/* Patient Vitals Entry Form */}
          <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.2rem' }}>🩺 Record Patient Vitals</h3>
            <form onSubmit={handleLogVitals} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Patient Full Name</label>
                <input type="text" required value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="e.g. Ramesh Kumar" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Blood Pressure</label>
                  <input type="text" required value={bp} onChange={(e) => setBp(e.target.value)} placeholder="120/80 mmHg" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Heart Rate (BPM)</label>
                  <input type="text" required value={hr} onChange={(e) => setHr(e.target.value)} placeholder="72" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Body Temp (°F)</label>
                  <input type="text" required value={temp} onChange={(e) => setTemp(e.target.value)} placeholder="98.6" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>SpO2 (%)</label>
                  <input type="text" required value={spo2} onChange={(e) => setSpo2(e.target.value)} placeholder="99" style={inputStyle} />
                </div>
              </div>
              <button type="submit" style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem' }}>
                Save Clinical Vitals Entry
              </button>
            </form>
          </div>

          {/* Logged Vitals Timeline */}
          <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '800', marginBottom: '1.2rem' }}>📊 Ward Monitoring Log</h3>
            {vitalsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b', background: '#f8fafc', borderRadius: '12px' }}>
                No vitals recorded today. Use the form on the left to record incoming patient readings.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {vitalsList.map((v) => (
                  <div key={v.id} style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #cbd5e1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: '800' }}>{v.patientName}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>🕒 {v.time}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                      <div style={vitalBadgeStyle}>
                        <span style={vitalLabel}>BP</span>
                        <strong style={{ color: '#0284c7', fontSize: '0.88rem' }}>{v.bloodPressure}</strong>
                      </div>
                      <div style={vitalBadgeStyle}>
                        <span style={vitalLabel}>HR</span>
                        <strong style={{ color: '#dc2626', fontSize: '0.88rem' }}>{v.heartRate}</strong>
                      </div>
                      <div style={vitalBadgeStyle}>
                        <span style={vitalLabel}>TEMP</span>
                        <strong style={{ color: '#d97706', fontSize: '0.88rem' }}>{v.temperature}</strong>
                      </div>
                      <div style={vitalBadgeStyle}>
                        <span style={vitalLabel}>SpO2</span>
                        <strong style={{ color: '#16a34a', fontSize: '0.88rem' }}>{v.oxygenSaturation}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

const labelStyle = { fontSize: '0.8rem', fontWeight: '700', color: '#475569', marginBottom: '0.3rem', display: 'block' };
const inputStyle = { width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem' };
const vitalBadgeStyle = { background: '#ffffff', padding: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' };
const vitalLabel = { fontSize: '0.68rem', color: '#64748b', fontWeight: '800', display: 'block' };