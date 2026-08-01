import { agents } from '@/data/agents'
import FallbackImage from '@/components/ui/FallbackImage'

export default function AgentsPage() {
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
            Our Team
          </p>
          {/* fontSize left off — the h1 rule in globals.css (with clamp + the
              768px/480px overrides) now controls sizing across breakpoints */}
          <h1 style={{ marginBottom: '16px' }}>
            Meet Our <em>Agents</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.7 }}>
            Our experienced team of real estate professionals is here to help you find your perfect property.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          {/* className drives the desktop 2-col layout AND the mobile 1-col
              override defined in globals.css (.agents-grid). No inline
              gridTemplateColumns here — it would beat the media query. */}
          <div className="agents-grid">
            {agents.map(function(agent) {
              return (
                <div key={agent.id} className="agent-card-inner" style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border)',
                  padding: '40px',
                }}>
                  {/* Agent Photo */}
                  <div>
                    <FallbackImage
                      src={agent.image}
                      alt={agent.name}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        aspectRatio: '1',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{
                      marginTop: '16px',
                      textAlign: 'center',
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: 'var(--near-black)',
                      }}>
                        {agent.rating}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Rating
                      </div>
                    </div>
                  </div>

                  {/* Agent Details */}
                  <div>
                    <p style={{
                      fontSize: '0.75rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '8px',
                    }}>
                      {agent.role}
                    </p>
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      marginBottom: '8px',
                    }}>
                      {agent.name}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                      {agent.location}
                    </p>

                    <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '24px' }}>
                      {agent.bio}
                    </p>

                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Specialties
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {agent.specialties.map(function(specialty) {
                          return (
                            <span key={specialty} style={{
                              background: 'var(--white)',
                              border: '1px solid var(--border)',
                              padding: '6px 12px',
                              fontSize: '0.8rem',
                              borderRadius: '4px',
                            }}>
                              {specialty}
                            </span>
                          )
                        })}
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Languages
                      </p>
                      <p style={{ fontSize: '0.9rem' }}>{agent.languages.join(', ')}</p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Performance
                      </p>
                      <div style={{ display: 'flex', gap: '32px' }}>
                        <div>
                          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                            {agent.dealsClosed}+
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Deals Closed
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <a
                        href={`tel:${agent.phone}`}
                        style={{
                          background: 'var(--near-black)',
                          color: 'var(--cream)',
                          padding: '12px 24px',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      >
                        Call Agent
                      </a>
                      <a
                        href={`https://wa.me/${agent.phone.replace('+', '')}?text=Hi ${agent.name}, I'm interested in a property.`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: '#25D366',
                          color: 'white',
                          padding: '12px 24px',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
