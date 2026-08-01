import Link from 'next/link'
import FallbackImage from '@/components/ui/FallbackImage'
import CounterStats from '@/components/ui/CounterStats'
import MarketStats from '@/components/ui/marketing/MarketStats'

export const metadata = {
  title: 'PrimeHub — About',
  description: 'Learn about PrimeHub, our Kenya real estate mission, team, and service areas.',
}

const values = [
  {
    icon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop',
    title: 'Honesty First',
    desc: 'We never inflate prices or hide costs. What you see is what you pay.',
  },
  {
    icon: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&h=100&fit=crop',
    title: 'Local Knowledge',
    desc: 'We operate in 8 counties and know every location we list — roads, schools, hospitals.',
  },
  {
    icon: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    title: 'Fast Response',
    desc: 'Our agents respond within 1 hour on WhatsApp. No waiting, no runaround.',
  },
  {
    icon: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=100&fit=crop',
    title: 'Clean Documentation',
    desc: 'Every property has a verified title deed. We handle the paperwork so you don\'t have to.',
  },
]

const team = [
  { name: 'James Kariuki', role: 'Founder & CEO', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Grace Muthoni', role: 'Head of Sales', location: 'Nakuru', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { name: 'Peter Odhiambo', role: 'Property Agent', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
  { name: 'Susan Waweru', role: 'Property Agent', location: 'Nanyuki', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'var(--cream)',
        padding: '80px 24px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          {/* Fluid grid wrapper for responsive layouts */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '40px', 
            alignItems: 'center' 
          }}>
            <div>
              <p style={{
                fontSize: '0.75rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}>
                Our Story
              </p>
              <h1 style={{ marginBottom: '24px' }}>
                {"Kenya's trusted"}<br />
                <em>real estate</em><br />
                partner.
              </h1>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
                PrimeHub was founded with one goal — to make property ownership accessible to every Kenyan, wherever they are.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, marginBottom: '32px' }}>
                From affordable plots along Kangundo Road to beachside villas in Mombasa, we connect buyers with the right property in the right location at the right price.
              </p>
              <Link href="/properties" style={{
                background: 'var(--near-black)',
                color: 'var(--cream)',
                padding: '14px 28px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}>
                Browse Properties
              </Link>
            </div>

            {/* Right — visual */}
            <div style={{
              background: 'var(--olive)',
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontStyle: 'italic',
                color: 'var(--cream)',
                lineHeight: 1.3,
              }}>
                &ldquo;We believe every Kenyan deserves a place to call home.&rdquo;
              </p>
              <div style={{
                borderTop: '1px solid rgba(245,240,232,0.2)',
                padding: '20px',
              }}>
                <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.85rem' }}>
                  — James Kariuki, Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <CounterStats />

      {/* Market Stats */}
      <MarketStats />

      {/* Values */}
      <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '12px',
            }}>
              What drives us
            </p>
            <h2>Our <em>Values</em></h2>
          </div>

          {/* Changed to auto-fit to enable responsive grid breaking */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {values.map((value) => (
              <div key={value.title} style={{
                background: 'var(--cream)',
                border: '1px solid var(--border)',
                padding: '32px 24px',
              }}>
                <div style={{ width: '48px', height: '48px', marginBottom: '16px' }}>
                  <FallbackImage
                    src={value.icon}
                    alt={value.title}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>{value.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations we serve */}
      <section style={{ padding: '80px 24px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '60px', 
            alignItems: 'center' 
          }}>
            <div>
              <p style={{
                fontSize: '0.75rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                Where we operate
              </p>
              <h2 style={{ marginBottom: '24px' }}>8 Locations <em>Across Kenya</em></h2>
              <p style={{ marginBottom: '32px', lineHeight: 1.8 }}>
                {"We don't just list properties — we research every location we operate in. Climate, infrastructure, schools, hospitals, and road access are all verified before we list a single property."}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['Nanyuki', 'Kiambu', 'Nakuru', 'Kajiado', 'Eldoret', 'Machakos', 'Mombasa', 'Kangundo Road'].map((loc) => (
                  <div key={loc} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}>
                    <span style={{ color: 'var(--olive)' }}>&rarr;</span>
                    {loc}
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'var(--cream-dark)',
              border: '1px solid var(--border)',
              padding: '48px',
              textAlign: 'center',
            }}>
              <div style={{ width: '80px', height: '80px', margin: '0 auto 16px' }}>
                <FallbackImage
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=150&h=150&fit=crop"
                  alt="Kenya Map snippet"
                  style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                />
              </div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                marginBottom: '8px',
              }}>
                From coast to highlands
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Mombasa beaches to Nanyuki highlands — we cover Kenya&apos;s most sought-after property locations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', background: 'var(--cream-dark)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '12px',
            }}>
              The people behind PrimeHub
            </p>
            <h2>Meet the <em>Team</em></h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}>
            {team.map((member) => (
              <div key={member.name} style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                padding: '32px 24px',
                textAlign: 'center',
              }}>
                <div style={{ width: '64px', height: '64px', margin: '0 auto 16px' }}>
                  <FallbackImage
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{member.role}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'var(--near-black)',
        color: 'var(--cream)',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.75rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.5)',
          marginBottom: '16px',
        }}>
          Ready to start?
        </p>
        <h2 style={{ color: 'var(--cream)', marginBottom: '16px' }}>
          Let&apos;s find your <em>property.</em>
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '32px', fontSize: '1rem' }}>
          Browse our listings or talk to an agent directly on WhatsApp.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/properties" style={{
            background: 'var(--cream)',
            color: 'var(--near-black)',
            padding: '14px 28px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}>
            Browse Properties
          </Link>
          <a href="https://wa.me/254712345678?text=Hi,%20I%20would%20like%20to%20learn%20more%20about%20PrimeHub%20properties" target="_blank" rel="noreferrer" style={{
            background: '#25D366',
            color: 'white',
            padding: '14px 28px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}>
            WhatsApp Us
          </a>
          <a href="tel:+254712345678" style={{
            border: '1px solid rgba(245,240,232,0.3)',
            color: 'var(--cream)',
            padding: '14px 28px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}>
            Call Us
          </a>
        </div>
      </section>
    </div>
  )
}