'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    // In production, you would send this to your backend
    setSubscribed(true)
    setEmail('')
  }
  return (
    <footer style={{
      background: 'var(--near-black)',
      color: 'var(--cream)',
      padding: '60px 24px 30px',
    }}>
      <div className="footer-main-grid" style={{
        maxWidth: 'var(--container-width)',
        margin: '0 auto',
        display: 'grid',
        gap: '48px',
        paddingBottom: '40px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>

        {/* Brand */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            marginBottom: '12px',
          }}>
            PrimeHub
          </h3>
          <p style={{
            color: 'rgba(245,240,232,0.6)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
          }}>
            Kenya's trusted real estate company. Find land and homes across Kenya — in the right location, at the right price.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontSize: '0.8rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            color: 'rgba(245,240,232,0.5)',
          }}>
            Quick Links
          </h4>
          {['Properties', 'Blog', 'Agents', 'FAQ', 'Guides', 'Contact'].map(item => (
            <div key={item} style={{ marginBottom: '10px' }}>
              <Link href={`/${item === 'FAQ' ? 'faq' : item.toLowerCase()}`} style={{
                color: 'rgba(245,240,232,0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}>
                {item}
              </Link>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{
            fontSize: '0.8rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            color: 'rgba(245,240,232,0.5)',
          }}>
            Get In Touch
          </h4>
          <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.9rem', marginBottom: '8px' }}>
            Mon – Fri: 8:00am – 6:00pm
          </p>
          <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.9rem', marginBottom: '16px' }}>
            Sat: 9:00am – 1:00pm
          </p>
          <a href="tel:+254712345678" style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.9rem', marginBottom: '12px', display: 'block', textDecoration: 'none' }}>
            +254 712 345 678
          </a>
          <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer" style={{
            background: '#25D366',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 500,
            display: 'inline-block',
          }}>
            WhatsApp Us
          </a>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{
            fontSize: '0.8rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            color: 'rgba(245,240,232,0.5)',
          }}>
            Newsletter
          </h4>
          <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.9rem', marginBottom: '16px' }}>
            Get the latest property listings and market updates.
          </p>
          {subscribed ? (
            <div style={{
              background: 'rgba(79, 209, 197, 0.2)',
              border: '1px solid rgba(79, 209, 197, 0.5)',
              padding: '12px',
              borderRadius: '4px',
              color: 'rgba(245,240,232,0.9)',
              fontSize: '0.85rem',
            }}>
              Thanks for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={function(e) { setEmail(e.target.value) }}
                required
                style={{
                  padding: '10px 12px',
                  background: 'rgba(245,240,232,0.1)',
                  border: '1px solid rgba(245,240,232,0.2)',
                  color: 'var(--cream)',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--cream)',
                  color: 'var(--near-black)',
                  padding: '10px 16px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 'var(--container-width)',
        margin: '24px auto 0',
        textAlign: 'center',
        color: 'rgba(245,240,232,0.4)',
        fontSize: '0.8rem',
      }}>
        © {new Date().getFullYear()} PrimeHub demo site. All rights reserved.
      </div>
    </footer>
  )
}
