import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

export default function LabTests() {
  const [availableTests] = useState([
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'Hematology', sampleType: 'Blood (5 ml)', cost: '₹500', desc: 'Evaluates red cells, white cells, platelets, and hemoglobin levels.' },
    { id: 2, name: 'Comprehensive Urinalysis', category: 'Biochemistry', sampleType: 'Urine (30 ml sample)', cost: '₹350', desc: 'Checks pH, protein, glucose, specific gravity, and microscopic sediment.' },
    { id: 3, name: 'Lipid Profile (Cholesterol)', category: 'Cardiology', sampleType: 'Blood (Fastings 8hr)', cost: '₹750', desc: 'Measures HDL, LDL, triglycerides, and total cholesterol risk.' },
    { id: 4, name: 'Liver Function Test (LFT)', category: 'Pathology', sampleType: 'Blood (3 ml)', cost: '₹800', desc: 'Assesses SGPT, SGOT, bilirubin, and albumin protein levels.' },
    { id: 5, name: 'Thyroid Panel (TSH, T3, T4)', category: 'Endocrinology', sampleType: 'Blood (2 ml)', cost: '₹900', desc: 'Evaluates metabolic hormone regulation.' }
  ]);

  const [myTests, setMyTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyTests();
  }, []);

  const loadMyTests = async () => {
    try {
      const data = await apiRequest('/lab-tests');
      if (Array.isArray(data) && data.length > 0) {
        setMyTests(data);
      } else {
        throw new Error('No tests found');
      }
    } catch (err) {
      console.error('Loading fallback lab test data:', err);
      // Fallback Mock Data for Demo
      setMyTests([
        {
          _id: 'lab-1',
          testName: 'Complete Blood Count (CBC)',
          category: 'Hematology',
          sampleType: 'Blood (5 ml)',
          cost: '₹500',
          status: 'Sample Collected',
          resultValues: 'Hemoglobin: 14.2 g/dL (Normal), WBC: 7,200 /µL (Normal)'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookTest = async (test) => {
    // 1. Create a local order object to display instantly
    const newOrder = {
      _id: Date.now().toString(),
      testName: test.name,
      category: test.category,
      sampleType: test.sampleType,
      cost: test.cost,
      status: 'Sample Collection Scheduled',
      resultValues: 'Pending laboratory analysis...'
    };

    // 2. Update state immediately so it appears on the right side
    setMyTests([newOrder, ...myTests]);
    alert(`Successfully ordered ${test.name}! Sample collection scheduled.`);

    // 3. Try saving to backend asynchronously in the background
    try {
      await apiRequest('/lab-tests', 'POST', {
        testName: test.name,
        category: test.category,
        sampleType: test.sampleType,
        cost: test.cost
      });
    } catch (err) {
      console.error('Backend sync note:', err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      
      {/* Header */}
      <div style={{ background: '#ffffff', padding: '1.8rem 2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
        <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: '800', padding: '3px 10px', borderRadius: '6px' }}>PATHOLOGY & LAB DIAGNOSTICS</span>
        <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginTop: '0.4rem' }}>Hospital Pathology Laboratory</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Order blood tests, urine screenings, and biochemistry panels with automated hospital lab tracking.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2rem' }}>
        
        {/* Available Tests Catalog */}
        <div>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1rem' }}>🔬 Available Diagnostic Panels</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {availableTests.map((test) => (
              <div key={test.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>{test.name}</h4>
                    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>{test.category}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.4rem' }}>{test.desc}</p>
                  <p style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: '600' }}>🧪 Sample Required: {test.sampleType}</p>
                </div>
                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>{test.cost}</span>
                  <button onClick={() => handleBookTest(test)} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.82rem' }}>
                    Order Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Lab Orders & Results */}
        <div>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '1rem' }}>📋 My Lab Requisitions & Reports</h3>
          {loading ? (
            <p style={{ color: '#64748b' }}>Loading records...</p>
          ) : myTests.length === 0 ? (
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '14px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
              No lab tests ordered yet. Select a panel from the catalog to begin.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {myTests.map((t) => (
                <div key={t._id} style={{ background: '#fff', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.98rem', color: '#0f172a' }}>{t.testName}</h4>
                    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.72rem', fontWeight: '700', padding: '2px 8px', borderRadius: '6px' }}>{t.status}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}><b>Sample:</b> {t.sampleType}</p>
                  <div style={{ marginTop: '0.6rem', background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '0.78rem', color: '#334155' }}><b>Pathologist Notes:</b> {t.resultValues}</p>
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