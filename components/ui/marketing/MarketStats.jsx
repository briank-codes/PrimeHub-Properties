import React from 'react'

const stats = [
  { label: 'Listings Reviewed', value: '1,200+' },
  { label: 'Happy Clients', value: '5,000+' },
  { label: 'Counties Covered', value: '8' },
  { label: 'Verified Titles', value: '100%' },
]

export default function MarketStats() {
  return (
    <section style={{ padding: '60px 24px', background: 'var(--cream-dark)' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Market snapshot
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
            Kenya property <em>market stats</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ background: 'var(--white)', border: '1px solid var(--border)', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--near-black)', marginBottom: '10px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
