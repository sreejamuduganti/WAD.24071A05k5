import React, { useState } from 'react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const URGENCY = ['Normal', 'Urgent', 'Critical'];

export default function RequestBlood({ donors }) {
  const [form, setForm] = useState({ patientName: '', bloodGroup: '', hospital: '', city: '', urgency: 'Normal', contact: '' });
  const [submitted, setSubmitted] = useState(false);
  const [matches, setMatches] = useState([]);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const matched = donors.filter(d => d.bloodGroup === form.bloodGroup && d.available &&
      d.city.toLowerCase() === form.city.toLowerCase());
    setMatches(matched);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <div className="card" style={{ marginBottom: 24 }}>
          <h2>✅ Request Submitted</h2>
          <p style={{ marginBottom: 8 }}>Blood request for <strong>{form.patientName}</strong> ({form.bloodGroup}) has been submitted.</p>
          <p style={{ color: '#c0392b', fontWeight: 600 }}>Urgency: {form.urgency}</p>
          <p style={{ marginTop: 8, color: '#666' }}>Hospital: {form.hospital}, {form.city}</p>
          <button className="btn-primary" style={{ marginTop: 16, width: 'auto', padding: '10px 24px' }}
            onClick={() => { setSubmitted(false); setForm({ patientName: '', bloodGroup: '', hospital: '', city: '', urgency: 'Normal', contact: '' }); }}>
            New Request
          </button>
        </div>
        <div className="page-header">
          <h2>🩸 Matching Donors in {form.city}</h2>
          <p>{matches.length} available donor(s) found for {form.bloodGroup}</p>
        </div>
        {matches.length === 0 ? (
          <p style={{ color: '#999' }}>No available donors found in {form.city} for blood group {form.bloodGroup}. Please contact the helpline.</p>
        ) : (
          <div className="donor-grid">
            {matches.map(d => (
              <div key={d.id} className="donor-card">
                <span className="blood-badge">{d.bloodGroup}</span>
                <h3>{d.name}</h3>
                <p>📍 {d.city}</p>
                <p>📞 {d.phone}</p>
                <p className="badge-available">✅ Available</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <div className="card">
        <h2>🩸 Request Blood</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Patient Name</label>
              <input type="text" placeholder="Patient's full name" required value={form.patientName} onChange={set('patientName')} />
            </div>
            <div className="form-group">
              <label>Blood Group Required</label>
              <select required value={form.bloodGroup} onChange={set('bloodGroup')}>
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Hospital Name</label>
              <input type="text" placeholder="Hospital name" required value={form.hospital} onChange={set('hospital')} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="City" required value={form.city} onChange={set('city')} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Urgency Level</label>
              <select value={form.urgency} onChange={set('urgency')}>
                {URGENCY.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input type="tel" placeholder="10-digit phone" required pattern="[0-9]{10}" value={form.contact} onChange={set('contact')} />
            </div>
          </div>
          <button type="submit" className="btn-primary">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
