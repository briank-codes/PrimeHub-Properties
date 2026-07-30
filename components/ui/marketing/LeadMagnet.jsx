"use client"
import { useState } from 'react'

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Minimal local mock behaviour — real integration can call /api/leadmagnet
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section style={{ padding: '60px 24px', background: 'var(--near-black)', color: 'var(--cream)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '8px' }}>Get market updates</h3>
        <p style={{ color: 'rgba(245,240,232,0.8)', marginBottom: '24px' }}>Join our list for new listings, price drops and buying tips.</p>

        {submitted ? (
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '18px', borderRadius: '8px' }}>
            Thank you — we'll be in touch.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border)', width: '320px' }}
            />
            <button type="submit" style={{ background: 'var(--olive)', color: 'var(--near-black)', padding: '12px 18px', borderRadius: '6px', fontWeight: 600 }}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
