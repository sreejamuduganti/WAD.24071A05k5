import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorList from './pages/DonorList';
import RequestBlood from './pages/RequestBlood';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [donors, setDonors] = useState([
    { id: 1, name: 'Arjun Reddy', bloodGroup: 'A+', phone: '9876543210', city: 'Hyderabad', available: true },
    { id: 2, name: 'Priya Sharma', bloodGroup: 'O-', phone: '9123456780', city: 'Secunderabad', available: true },
    { id: 3, name: 'Ravi Kumar', bloodGroup: 'B+', phone: '9988776655', city: 'Kukatpally', available: false },
  ]);

  return (
    <Router>
      <nav className="navbar">
        <div className="nav-brand">🩸 BloodConnect</div>
        <div className="nav-links">
          <Link to="/donors">Donors</Link>
          <Link to="/request">Request Blood</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
            <button className="btn-nav" onClick={() => setUser(null)}>Logout ({user.name})</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn-register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/donors" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} addDonor={(d) => setDonors(prev => [...prev, d])} />} />
          <Route path="/donors" element={<DonorList donors={donors} />} />
          <Route path="/request" element={<RequestBlood donors={donors} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
