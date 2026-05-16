import React, { useState } from 'react';

const BLOOD_GROUPS = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonorList({ donors }) {
  const [search, setSearch] = useState('');
  const [bloodFilter, setBloodFilter] = useState('All');

  const filtered = donors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase());
    const matchBlood = bloodFilter === 'All' || d.bloodGroup === bloodFilter;
    return matchSearch && matchBlood;
  });

  return (
    <div>
      <div className="page-header">
        <h2>🩸 Registered Donors</h2>
        <p>Find blood donors near you</p>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={bloodFilter} onChange={e => setBloodFilter(e.target.value)}>
          {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg === 'All' ? 'All Blood Groups' : bg}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center', marginTop: 40 }}>No donors found matching your criteria.</p>
      ) : (
        <div className="donor-grid">
          {filtered.map(donor => (
            <div key={donor.id} className="donor-card">
              <span className="blood-badge">{donor.bloodGroup}</span>
              <h3>{donor.name}</h3>
              <p>📍 {donor.city}</p>
              <p>📞 {donor.phone}</p>
              <p className={donor.available ? 'badge-available' : 'badge-unavailable'}>
                {donor.available ? '✅ Available' : '⏳ Unavailable'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
