import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_USERS = [
  { email: 'admin@blood.com', password: 'admin123', name: 'Admin' },
];

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = MOCK_USERS.find(u => u.email === form.email && u.password === form.password);
    if (found) {
      setUser(found);
      navigate('/donors');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <div className="card">
        <h2>🩸 Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="link-text">Don't have an account? <Link to="/register">Register here</Link></p>
        <p className="link-text" style={{ marginTop: 8, color: '#999', fontSize: '0.8rem' }}>
          Demo: admin@blood.com / admin123
        </p>
      </div>
    </div>
  );
}
