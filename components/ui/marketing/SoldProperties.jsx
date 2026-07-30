"use client"
import { soldProperties } from '@/data/soldProperties'

export default function SoldProperties() {
  return (
    <section style={{ padding: '60px 24px', background: 'var(--cream-dark)' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', color: 'var(--near-black)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '16px' }}>Recently Sold</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {soldProperties.map(p => (
            <div key={p.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ height: '140px', overflow: 'hidden' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '12px' }}>
                <div style={{ fontWeight: 700 }}>{p.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>{p.location}</div>
                <div style={{ marginTop: '8px', fontWeight: 700 }}>{`KSh ${p.soldPrice.toLocaleString()}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
