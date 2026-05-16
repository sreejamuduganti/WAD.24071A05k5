import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <div className="page-header">
        <h2>Contact Us</h2>
        <p>Reach out to us for any queries or support</p>
      </div>
      <div className="contact-grid">
        <div className="card contact-info">
          <h3>Get In Touch</h3>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <p>12-3, Blood Bank Road, Banjara Hills, Hyderabad, Telangana 500034</p>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <p>+91 40 2345 6789<br />+91 98765 43210</p>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <p>help@bloodconnect.org<br />support@bloodconnect.org</p>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🕐</span>
            <p>Mon – Sat: 8:00 AM – 8:00 PM<br />Emergency: 24/7</p>
          </div>
        </div>
        <div className="card">
          <h3 style={{ color: '#c0392b', marginBottom: 20 }}>Send a Message</h3>
          {sent ? (
            <div>
              <p className="success" style={{ fontSize: '1rem' }}>✅ Message sent successfully! We'll get back to you soon.</p>
              <button className="btn-primary" style={{ marginTop: 16, width: 'auto', padding: '10px 24px' }} onClick={() => setSent(false)}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Full name" required value={form.name} onChange={set('name')} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your email" required value={form.email} onChange={set('email')} />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={4} placeholder="Write your message..." required value={form.message} onChange={set('message')} />
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
