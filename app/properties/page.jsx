'use client'
import { useState } from 'react'
import Link from 'next/link'
import FallbackImage from '@/components/ui/FallbackImage'
import { properties } from '@/data/properties'

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatPriceLabel(property) {
  const formatted = 'KSh ' + property.price.toLocaleString()
  return property.type === 'rent' ? `${formatted}/mo` : formatted
}

function buildTags(property) {
  return [
    property.type === 'rent' ? 'For Rent' : 'For Sale',
    property.category,
    property.location.area,
  ]
}

const QUICK_FILTERS = Array.from(new Set(properties.map(p => p.location.area)))

// ─── Property Card ──────────────────────────────────────────────────────────
function PropertyCard({ property }) {
  const tags = buildTags(property)
  const priceLabel = formatPriceLabel(property)

  return (
    <article style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.2s, border-color 0.2s',
    }}>
      {/* Image, badge, price overlay */}
      <div style={{ position: 'relative', aspectRatio: '4 / 3', width: '100%', background: 'var(--cream-dark)', overflow: 'hidden' }}>
        <FallbackImage
          src={property.image}
          alt={property.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {property.featured && (
          <span style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            background: 'var(--olive)',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            zIndex: 1,
          }}>
            Featured
          </span>
        )}

        <div style={{
          position: 'absolute',
          bottom: '14px',
          left: '14px',
          background: 'rgba(255,255,255,0.95)',
          color: 'var(--near-black)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1rem',
          padding: '6px 14px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}>
          {priceLabel}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} style={{
                background: 'var(--cream-dark)',
                color: 'var(--text-muted)',
                fontSize: '0.65rem',
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <h2 style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--near-black)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {property.title}
          </h2>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <a
            href={`https://wa.me/${property.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in: ${property.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: '#fff',
              borderRadius: '8px',
              padding: '10px 4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            WhatsApp
          </a>
          <a
            href={`tel:+${property.whatsapp}`}
            style={{
              background: 'transparent',
              color: 'var(--near-black)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '10px 4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Call
          </a>
          <Link
            href={`/properties/${property.id}`}
            style={{
              background: 'var(--near-black)',
              color: 'var(--cream)',
              borderRadius: '8px',
              padding: '10px 4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  let filtered = activeFilter === 'all'
    ? properties
    : properties.filter(p => p.location.area === activeFilter)

  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Breadcrumb / stats bar */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--near-black)', fontWeight: 500 }}>Properties</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 700, color: 'var(--near-black)' }}>{properties.length}</span> Properties available
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '32px 24px 64px' }}>

        {/* Title & sort */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '28px',
        }}>
          <div>
            {/* fontSize left to the h1 rule in globals.css so it shrinks under the 768px/480px breakpoints */}
            <h1 style={{ color: 'var(--near-black)' }}>Properties</h1>
            <div style={{ height: '4px', width: '48px', background: 'var(--olive)', marginTop: '8px', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '10px 14px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                background: '#fff',
                color: 'var(--near-black)',
              }}
            >
              <option value="default">Default Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Quick filters */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '32px',
        }}>
          <button
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '8px 16px',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: activeFilter === 'all' ? 'var(--near-black)' : 'var(--cream-dark)',
              color: activeFilter === 'all' ? 'var(--cream)' : 'var(--text-muted)',
            }}
          >
            All Properties
          </button>
          {QUICK_FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '8px 16px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                background: activeFilter === filter ? 'var(--near-black)' : 'transparent',
                color: activeFilter === filter ? 'var(--cream)' : 'var(--text-muted)',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '60px 24px',
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}>
            No properties match this filter.
          </div>
        ) : (
          // className drives the desktop 3-col layout AND the mobile 1-col
          // override defined in globals.css (.properties-grid). No inline
          // gridTemplateColumns here — inline styles would beat the media query.
          <div className="properties-grid">
            {filtered.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
