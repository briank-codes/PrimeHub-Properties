import { neighborhoodGuides } from '@/data/neighborhoodGuides'
import Link from 'next/link'

export default function NeighborhoodGuidesPage() {
  const locations = Object.keys(neighborhoodGuides)

  return (
    <div>
      <section style={{
        background: 'var(--cream)',
        padding: '80px 24px 60px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px',
          }}>
            Location Insights
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            marginBottom: '16px',
          }}>
            Neighborhood <em>Guides</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.7 }}>
            Comprehensive guides to Kenya's top real estate locations. Learn about climate, infrastructure, lifestyle, and investment potential.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '48px',
          }}>
            {locations.map(function(location) {
              const guide = neighborhoodGuides[location]
              return (
                <Link key={location} href={`/guides/${location}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                  }}>
                    <div style={{
                      height: '180px',
                      background: 'linear-gradient(135deg, var(--cream-dark) 0%, var(--olive-light) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        color: 'var(--cream)',
                      }}>
                        {location}
                      </h2>
                    </div>
                    <div style={{ padding: '32px' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                        {guide.overview}
                      </p>
                      <div style={{ marginBottom: '24px' }}>
                        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
                          Highlights
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {guide.highlights.slice(0, 3).map(function(highlight) {
                            return (
                              <span key={highlight} style={{
                                background: 'var(--white)',
                                border: '1px solid var(--border)',
                                padding: '6px 12px',
                                fontSize: '0.8rem',
                                borderRadius: '4px',
                              }}>
                                {highlight}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            Average ROI
                          </p>
                          <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--olive)' }}>
                            {guide.investment.roi}
                          </p>
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'var(--olive)', fontWeight: 500 }}>
                          View Guide →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}