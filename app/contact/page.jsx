import ContactForm from '@/components/ui/ContactForm'

export const metadata = {
  title: 'PrimeHub — Contact',
  description: 'Reach out to PrimeHub for Kenya property buying and selling support.',
}

const officeLocations = [
  { area: 'Nairobi (HQ)', address: 'Westlands, Nairobi', phone: '+254 712 345 678' },
  { area: 'Mombasa', address: 'Nyali, Mombasa', phone: '+254 712 345 679' },
  { area: 'Nakuru', address: 'Section 58, Nakuru', phone: '+254 712 345 680' },
]

const businessHours = [
  { day: 'Monday - Friday', hours: '8:00am - 6:00pm' },
  { day: 'Saturday', hours: '9:00am - 1:00pm' },
  { day: 'Sunday', hours: 'By appointment only' },
]

export default function ContactPage() {
  return (
    <div>
      <section style={{
        background: 'var(--cream)',
        padding: 'var(--section-padding)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '12px',
          }}>
            Get in touch
          </p>
          <h1 style={{ marginBottom: '16px' }}>
            Let's Talk <em>Property.</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.8 }}>
            Whether you are buying, selling, or just exploring — our team is ready to help. We respond within 1 hour on WhatsApp.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
        {/* className drives the desktop 1fr/420px split AND the mobile
            single-column override defined in globals.css (.contact-grid).
            No inline gridTemplateColumns here — it would beat the media query. */}
        <div className="contact-grid" style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          alignItems: 'start',
        }}>
          <div>
            <h2 style={{ marginBottom: '8px' }}>Send us a <em>message</em></h2>
            <p style={{ marginBottom: '40px', color: 'var(--text-muted)' }}>
              Fill in the form and we will reach out via WhatsApp.
            </p>
            <ContactForm />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: '#25D366',
              padding: '32px',
              color: 'white',
            }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '40px', height: '40px', marginBottom: '12px' }} />
              <h3 style={{ color: 'white', marginBottom: '8px', fontSize: '1.2rem' }}>
                Fastest response on WhatsApp
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Our agents are online Mon - Sat. Average response time: under 1 hour.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/254712345678"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    background: 'white',
                    color: '#25D366',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  Open WhatsApp
                </a>
                <a
                  href="tel:+254712345678"
                  style={{
                    display: 'inline-block',
                    background: 'transparent',
                    color: 'white',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: '1px solid rgba(255,255,255,0.5)',
                  }}
                >
                  Call Now
                </a>
              </div>
            </div>

            <div style={{
              background: 'var(--cream)',
              border: '1px solid var(--border)',
              padding: '28px',
            }}>
              <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Business Hours</h3>
              {businessHours.map((item) => (
                <div key={item.day} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.85rem',
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.day}</span>
                  <span style={{ fontWeight: 500 }}>{item.hours}</span>
                </div>
              ))}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <a href="tel:+254712345678" style={{ color: 'var(--near-black)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                  +254 712 345 678
                </a>
              </div>
            </div>

            <div style={{
              background: 'var(--cream)',
              border: '1px solid var(--border)',
              padding: '28px',
            }}>
              <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Our Offices</h3>
              {officeLocations.map((office) => (
                <div key={office.area} style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{office.area}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{office.address}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{office.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{
        background: 'var(--near-black)',
        color: 'var(--cream)',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{ color: 'var(--cream)', marginBottom: '12px' }}>
          Not sure where to start?
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '28px' }}>
          Browse our listings and find something you like — then reach out.
        </p>
        <a href="/properties" style={{
          background: 'var(--cream)',
          color: 'var(--near-black)',
          padding: '14px 32px',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'inline-block',
        }}>
          Browse Properties
        </a>
      </section>
    </div>
  )
}
