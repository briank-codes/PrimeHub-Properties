'use client'
import Link from 'next/link'
import { useState } from 'react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      background: 'var(--cream)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 'var(--container-width)',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px',
      }}>

        {/* Logo */}
        <Link href="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          {/* House icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="4" fill="var(--near-black)"/>
            <polygon points="18,8 28,18 8,18" fill="var(--cream)"/>
            <rect x="13" y="18" width="10" height="10" rx="1" fill="var(--cream)"/>
            <rect x="16" y="21" width="4" height="7" rx="0" fill="var(--near-black)"/>
          </svg>
          {/* Text */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--near-black)',
              letterSpacing: '-0.5px',
              lineHeight: 1,
            }}>
              PrimeHub
            </div>
            <div style={{
              fontSize: '0.6rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              lineHeight: 1,
              marginTop: '3px',
            }}>
              Kenya Real Estate
            </div>
          </div>
        </Link>

        {/* Mobile Menu Toggle — matches nav link styling */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: 500,
            fontFamily: 'inherit',
            cursor: 'pointer',
            padding: '12px',
            minHeight: '44px',
          }}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        {/* Desktop Links */}
        <div className="desktop-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {[
            { label: 'Properties', href: '/properties' },
            { label: 'Locations', href: '/#locations' },
            { label: 'About', href: '/about' },
            { label: 'Agents', href: '/agents' },
            { label: 'Contact', href: '/contact' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}>
              {link.label}
            </Link>
          ))}

          {/* WhatsApp — outlined pill with real icon */}
          <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer" style={{
            background: 'transparent',
            color: 'var(--olive)',
            border: '1.5px solid var(--olive)',
            borderRadius: '999px',
            padding: '10px 22px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <WhatsAppIcon size={16} />
            WhatsApp Us
          </a>

          {/* View Listings — solid pill */}
          <Link href="/properties" style={{
            background: 'var(--near-black)',
            color: 'var(--cream)',
            borderRadius: '999px',
            padding: '10px 22px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}>
            View Listings
          </Link>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--cream)',
          padding: '16px 24px',
          borderTop: '1px solid var(--border)',
        }}>
          {[
            { label: 'Properties', href: '/properties' },
            { label: 'Locations', href: '/#locations' },
            { label: 'About', href: '/about' },
            { label: 'Agents', href: '/agents' },
            { label: 'Contact', href: '/contact' },
          ].map(link => (
            <div key={link.href} style={{ marginBottom: '12px' }}>
              <Link href={link.href} style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
              }} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </div>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="tel:+254712345678" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
              +254 712 345 678
            </a>
            <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer" style={{
              background: 'transparent',
              color: 'var(--olive)',
              border: '1.5px solid var(--olive)',
              borderRadius: '999px',
              padding: '10px 20px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <WhatsAppIcon size={16} />
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}