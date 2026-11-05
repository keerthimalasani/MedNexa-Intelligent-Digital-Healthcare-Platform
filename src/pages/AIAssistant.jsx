import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIAssistant() {
  const [symptoms, setSymptoms] = useState('');
  const [triageResult, setTriageResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setAnalyzing(true);
    setTriageResult(null);

    // Simulate AI Triage Processing
    setTimeout(() => {
      const lower = symptoms.toLowerCase();
      let res = {
        specialty: 'General Physician',
        urgency: 'Moderate Priority',
        urgencyColor: '#d97706',
        advice: 'Schedule a routine physical consultation. Hydrate well and monitor your symptoms.'
      };

      if (lower.includes('chest') || lower.includes('heart') || lower.includes('shortness of breath') || lower.includes('bp') || lower.includes('palpitations')) {
        res = {
          specialty: 'Cardiologist',
          urgency: 'HIGH PRIORITY / URGENT',
          urgencyColor: '#dc2626',
          advice: 'Immediate clinical evaluation recommended. Avoid heavy physical exertion and consult a cardiologist immediately.'
        };
      } else if (lower.includes('headache') || lower.includes('dizziness') || lower.includes('numbness') || lower.includes('brain') || lower.includes('migraine')) {
        res = {
          specialty: 'Neurologist',
          urgency: 'Elevated Attention',
          urgencyColor: '#2563eb',
          advice: 'Consult a neurology specialist for a comprehensive neurological exam and CT/MRI evaluation.'
        };
      } else if (lower.includes('bone') || lower.includes('joint') || lower.includes('back pain') || lower.includes('fracture') || lower.includes('knee')) {
        res = {
          specialty: 'Orthopedician',
          urgency: 'Standard Care',
          urgencyColor: '#059669',
          advice: 'Rest the affected area. Consider an orthopedic appointment for X-ray and structural joint assessment.'
        };
      } else if (lower.includes('skin') || lower.includes('rash') || lower.includes('itching') || lower.includes('acne')) {
        res = {
          specialty: 'Dermatologist',
          urgency: 'Standard Care',
          urgencyColor: '#059669',
          advice: 'Avoid scratching or applying unverified topical creams. Schedule a dermatological examination.'
        };
      } else if (lower.includes('child') || lower.includes('baby') || lower.includes('fever') || lower.includes('infant')) {
        res = {
          specialty: 'Pediatrician',
          urgency: 'Priority Care',
          urgencyColor: '#d97706',
          advice: 'Keep the patient hydrated and consult a pediatric specialist for growth and symptom evaluation.'
        };
      }

      setTriageResult(res);
      setAnalyzing(false);
    }, 800);
  };

  // Direct Redirection to Doctor Directory with Auto-Filter
  const handleGoToDoctor = (specialty) => {
    // Navigates to Doctors Directory carrying the suggested specialty as URL parameter
    navigate(`/doctors?search=${encodeURIComponent(specialty)}`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', padding: '2.2rem 2.5rem', borderRadius: '24px', color: '#fff', marginBottom: '2rem', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.75rem', fontWeight: '800', padding: '4px 12px', borderRadius: '20px' }}>✨ CLINICAL TRIAGE ENGINE</span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '0.6rem' }}>MedNexa AI Health Assistant</h2>
        <p style={{ color: '#e0f2fe', fontSize: '0.95rem', marginTop: '0.4rem', maxWidth: '600px', margin: '0.4rem auto 0' }}>Describe your health issues below. The AI will recommend the right specialist and take you straight to their booking page.</p>
      </div>

      {/* Input Form Card */}
      <div className="mednexa-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <form onSubmit={handleAnalyze}>
          <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '0.6rem' }}>
            What symptoms or problems are you experiencing?
          </label>
          <textarea
            rows="4"
            required
            placeholder="e.g. I have severe chest pain, shortness of breath, and high blood pressure..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem', resize: 'vertical', marginBottom: '1.2rem' }}
          />
          <button type="submit" disabled={analyzing} style={{ width: '100%', background: '#0284c7', color: '#fff', border: 'none', padding: '0.9rem', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
            {analyzing ? 'Analyzing Health Problem...' : '✨ Recommend Specialist & Find Doctor'}
          </button>
        </form>
      </div>

      {/* AI Triage & Direct Route Card */}
      {triageResult && (
        <div className="mednexa-card" style={{ padding: '2rem', borderLeft: `6px solid ${triageResult.urgencyColor}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.85rem', fontWeight: '800', padding: '6px 12px', borderRadius: '8px' }}>
              RECOMMENDED SPECIALIST: <b>{triageResult.specialty}</b>
            </span>
            <span style={{ background: triageResult.urgencyColor, color: '#fff', fontSize: '0.75rem', fontWeight: '800', padding: '4px 10px', borderRadius: '6px' }}>
              {triageResult.urgency}
            </span>
          </div>

          <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: '800', marginBottom: '0.5rem' }}>AI Clinical Diagnosis Advice</h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.8rem' }}>{triageResult.advice}</p>

          <button 
            onClick={() => handleGoToDoctor(triageResult.specialty)} 
            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '0.9rem 1.8rem', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }}
          >
            👨‍⚕️ Proceed Directly to Available {triageResult.specialty} Specialists →
          </button>
        </div>
      )}

    </div>
  );
}