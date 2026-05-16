import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Register({ setUser, addDonor }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', bloodGroup: '', city: '' });
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDonor = {
      id: Date.now(),
      name: form.name,
      bloodGroup: form.bloodGroup,
      phone: form.phone,
      city: form.city,
      available: true,
    };
    addDonor(newDonor);
    setUser({ name: form.name, email: form.email });
    setSuccess('Registration successful! Redirecting...');
    setTimeout(() => navigate('/donors'), 1500);
  };

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <div className="card">
        <h2>🩸 Donor Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your full name" required value={form.name} onChange={set('name')} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your email" required value={form.email} onChange={set('email')} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create password" required minLength={6} value={form.password} onChange={set('password')} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="10-digit phone" required pattern="[0-9]{10}" value={form.phone} onChange={set('phone')} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Blood Group</label>
              <select required value={form.bloodGroup} onChange={set('bloodGroup')}>
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="Your city" required value={form.city} onChange={set('city')} />
            </div>
          </div>
          {success && <p className="success">{success}</p>}
          <button type="submit" className="btn-primary">Register as Donor</button>
        </form>
        <p className="link-text">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}
