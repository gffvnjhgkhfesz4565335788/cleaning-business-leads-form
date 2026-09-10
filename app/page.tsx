'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Thank you for your submission!');
        setFormData({ name: '', email: '', phone: '', address: '' });
      } else {
        const result = await response.json();
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatus('Error: Could not submit form');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Contact Us - Cleaning Business</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%' }} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%' }} />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%' }} />
        </label>
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} style={{ width: '100%' }} />
        </label>
        <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>Submit</button>
      </form>
      {status && <p>{status}</p>}
    </main>
  );
}
