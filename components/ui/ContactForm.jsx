'use client'
import { useState } from 'react'

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  interest: 'buying',
  location: '',
  message: '',
}

const locationOptions = [
  'Any location',
  'Nanyuki',
  'Kiambu',
  'Nakuru',
  'Kajiado',
  'Eldoret',
  'Machakos',
  'Mombasa',
  'Kangundo Road',
]

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to send your message at this time.')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid var(--border)',
    background: 'var(--white)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    color: 'var(--text-primary)',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    fontWeight: 500,
  }

  if (submitted) {
    return (
      <div style={{
        background: 'var(--cream)',
        border: '1px solid var(--border)',
        padding: '48px',
        textAlign: 'center',
      }}>
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop"
          alt="Success"
          style={{ width: '64px', height: '64px', marginBottom: '16px', borderRadius: '50%' }}
        />
        <h3 style={{ marginBottom: '8px' }}>Message received</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          We received your enquiry. Our team will reach out to you shortly.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/254712345678"
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'var(--near-black)',
              color: 'var(--cream)',
              padding: '12px 24px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            Open WhatsApp
          </a>
          <button
            onClick={() => {
              setFormData(initialFormData)
              setSubmitted(false)
              setError('')
            }}
            style={{
              background: 'transparent',
              color: 'var(--near-black)',
              padding: '12px 24px',
              border: '1px solid var(--border)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="James Kariuki"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+254 7XX XXX XXX"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="james@email.com"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={labelStyle}>I am interested in *</label>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="buying">Buying a property</option>
            <option value="renting">Renting a property</option>
            <option value="selling">Selling my property</option>
            <option value="investing">Investment advice</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Preferred Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
          >
            {locationOptions.map((loc) => (
              <option key={loc} value={loc === 'Any location' ? '' : loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us what you're looking for..."
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          background: 'var(--near-black)',
          color: 'var(--cream)',
          padding: '16px 32px',
          border: 'none',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-body)',
          width: '100%',
        }}
      >
        {loading ? 'Sending...' : 'Send message'}
      </button>

      {error && (
        <div style={{ color: '#B91C1C', fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        This is a demo contact form for the PrimeHub site.
      </p>
    </form>
  )
}
