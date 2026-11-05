import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search') || '';
    setSearch(searchTerm);

    fetchDoctors();
  }, [location.search]);

  const fetchDoctors = async () => {
    try {
      const data = await apiRequest('/doctors');
      if (Array.isArray(data) && data.length > 0) {
        setDoctors(data);
      } else {
        throw new Error('No doctors returned');
      }
    } catch (err) {
      console.error('Loading fallback directory:', err);
      // Expanded fallback list of 10 doctors
      setDoctors([
        { _id: '1', name: 'Dr. Alisha Khan', specialization: 'Cardiology & Heart Care', qualification: 'MBBS, MD - Cardiology (AIIMS Delhi)', experience: '10 yrs exp', fee: 600, available: 'Morning (10 AM - 1 PM)' },
        { _id: '2', name: 'Dr. Robert Chen', specialization: 'Neurology & Brain Sciences', qualification: 'MBBS, DM - Neurology (PGI Chandigarh)', experience: '12 yrs exp', fee: 600, available: 'Afternoon (2 PM - 5 PM)' },
        { _id: '3', name: 'Dr. Priya Patel', specialization: 'Pediatrics', qualification: 'MBBS, DCH - Child Health', experience: '8 yrs exp', fee: 450, available: 'Morning (10 AM - 1 PM)' },
        { _id: '4', name: 'Dr. Sophia Patel', specialization: 'Orthopedics & Joint Surgery', qualification: 'MBBS, MS - Orthopedic Surgery', experience: '9 yrs exp', fee: 500, available: 'Evening (5 PM - 8 PM)' },
        { _id: '5', name: 'Dr. Neha Sen', specialization: 'Dermatology & Skin Care', qualification: 'MBBS, MD - Dermatology (CMC Vellore)', experience: '7 yrs exp', fee: 550, available: 'Afternoon (1 PM - 4 PM)' },
        { _id: '6', name: 'Dr. Rajesh Verma', specialization: 'General Medicine', qualification: 'MBBS, Internal Medicine', experience: '15 yrs exp', fee: 350, available: 'Morning (9 AM - 12 PM)' },
        { _id: '7', name: 'Dr. David Miller', specialization: 'Ophthalmology', qualification: 'MBBS, MS - Eye Surgery', experience: '11 yrs exp', fee: 400, available: 'Morning (10 AM - 1 PM)' },
        { _id: '8', name: 'Dr. Ananya Roy', specialization: 'Gynecology & Obstetrics', qualification: 'MBBS, DGO, MD - OB/GYN', experience: '14 yrs exp', fee: 650, available: 'Morning (9 AM - 12 PM)' },
        { _id: '9', name: 'Dr. James Wilson', specialization: 'Cardiology & Heart Care', qualification: 'MBBS, DM - Cardiology', experience: '16 yrs exp', fee: 700, available: 'Evening (4 PM - 7 PM)' },
        { _id: '10', name: 'Dr. Neha Gupta', specialization: 'Neurology & Brain Sciences', qualification: 'MBBS, MD - Neurology', experience: '10 yrs exp', fee: 650, available: 'Morning (11 AM - 2 PM)' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    (doc.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (doc.specialization || '').toLowerCase().includes(search.toLowerCase()) ||
    (doc.qualification || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1240px', margin: '2.5rem auto', padding: '0 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', padding: '2rem 2.5rem', borderRadius: '20px', color: '#fff', marginBottom: '2rem' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '6px' }}>EXPERT SPECIALISTS</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.4rem' }}>Verified Doctor Directory</h2>
        <p style={{ color: '#e0f2fe', fontSize: '0.9rem' }}>Browse our expert medical professionals across multiple clinical departments.</p>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search by doctor name or specialty..." 
          style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '0.95rem', background: '#fff', color: '#0f172a' }}
        />
      </div>

      {loading ? (
        <p style={{ color: '#64748b' }}>Loading doctors directory...</p>
      ) : filteredDoctors.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#f8fafc', borderRadius: '16px', color: '#64748b' }}>
          No doctors found matching your search.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredDoctors.map((doc) => (
            <div key={doc._id || doc.id} style={{ background: '#fff', padding: '1.8rem', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: '800', margin: 0 }}>{doc.name}</h3>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: '700', padding: '3px 8px', borderRadius: '6px' }}>{doc.experience || doc.exp}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#0284c7', fontWeight: '700', margin: '4px 0 10px 0' }}>{doc.specialization || doc.specialty}</p>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 8px 0' }}>{doc.qualification}</p>
                <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0 }}>🕒 {doc.available || 'Available Daily'}</p>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>₹{doc.fee || 500}</span>
                <button 
                  onClick={() => navigate('/dashboard')} 
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}