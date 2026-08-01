'use client'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { properties } from '@/data/properties'
import FavoriteButton from '@/components/ui/FavoriteButton'
import FallbackImage from '@/components/ui/FallbackImage'
import ImageGallery from '@/components/properties/ImageGallery'
import MortgageCalculator from '@/components/properties/MortgageCalculator'
import PropertyMapClient from '@/components/properties/PropertyMapClient'
import VirtualTour from '@/components/properties/VirtualTour'

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatKES(amount) {
  if (amount >= 1000000) return 'KSh ' + (amount / 1000000).toFixed(1) + 'M'
  if (amount >= 1000) return 'KSh ' + (amount / 1000).toFixed(0) + 'K'
  return 'KSh ' + amount.toLocaleString()
}

// ─── Compact card for "Similar Properties" ──────────────────────────────────
function MiniPropertyCard({ property }) {
  const priceLabel = property.type === 'rent'
    ? `${formatKES(property.price)}/mo`
    : formatKES(property.price)

  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '160px',
          background: 'linear-gradient(135deg, var(--cream-dark) 0%, var(--olive-light) 100%)',
          overflow: 'hidden',
        }}>
          {property.image && (
            <FallbackImage src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
        <div style={{ padding: '16px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--near-black)', marginBottom: '4px' }}>
            {priceLabel}
          </div>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '4px' }}>{property.title}</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📍 {property.location?.area}</p>
        </div>
      </div>
    </Link>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
  const params = useParams()

  const property = useMemo(
    () => properties.find(p => String(p.id) === String(params?.id)),
    [params?.id]
  )

  if (!property) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--near-black)' }}>
          Property not found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          This listing may have been sold or removed.
        </p>
        <Link href="/properties" style={{
          background: 'var(--near-black)',
          color: 'var(--cream)',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '0.85rem',
          fontWeight: 500,
        }}>
          ← Back to Properties
        </Link>
      </div>
    )
  }

  const isPlot = property.category === 'plot'
  const priceLabel = property.type === 'rent'
    ? `${formatKES(property.price)}/mo`
    : formatKES(property.price)

  const images = property.images && property.images.length
    ? property.images
    : property.image ? [property.image] : []

  const hasCoords = property.location?.coordinates?.lat != null && property.location?.coordinates?.lng != null

  const similar = properties
    .filter(p => p.id !== property.id && p.location?.area === property.location?.area)
    .slice(0, 3)

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in: ${property.title}`)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Back link */}
      <section style={{ padding: '24px 24px 0' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <Link href="/properties" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}>
            ← Back to Properties
          </Link>
        </div>
      </section>

      <section style={{ padding: '20px 24px 64px' }}>
        <div style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '40px',
          alignItems: 'start',
        }}>

          {/* ── LEFT: main content ──────────────────────────────────────── */}
          <div>
            <ImageGallery images={images} title={property.title} />

            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  background: property.type === 'rent' ? 'var(--olive)' : 'var(--near-black)',
                  color: 'var(--cream)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}>
                  {property.type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--near-black)', marginBottom: '6px' }}>
                  {property.title}
                </h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  📍 {property.location?.area}
                </p>
              </div>
              <FavoriteButton propertyId={property.id} />
            </div>

            {/* Specs */}
            {!isPlot && property.specs && (
              <div style={{
                display: 'flex',
                gap: '28px',
                padding: '20px 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                marginBottom: '28px',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--near-black)' }}>{property.specs.bedrooms}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bedrooms</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--near-black)' }}>{property.specs.bathrooms}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bathrooms</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--near-black)' }}>{property.specs.size}m²</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Size</div>
                </div>
              </div>
            )}
            {isPlot && property.specs && (
              <div style={{
                padding: '20px 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                marginBottom: '28px',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
              }}>
                📐 {property.specs.size}x100 ft plot
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '12px', color: 'var(--near-black)' }}>
                  Description
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {property.description}
                </p>
              </div>
            )}

            {/* Amenities / tags */}
            {property.tags && property.tags.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '12px', color: 'var(--near-black)' }}>
                  Highlights
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {property.tags.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--olive)' }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Virtual tour */}
            {property.virtualTour && (
              <VirtualTour videoUrl={property.virtualTour} title={property.title} />
            )}

            {/* Map */}
            {hasCoords && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '12px', color: 'var(--near-black)' }}>
                  Location
                </h3>
                <PropertyMapClient
                  lat={Number(property.location.coordinates.lat)}
                  lng={Number(property.location.coordinates.lng)}
                  title={property.title}
                  area={property.location.area}
                />
              </div>
            )}

            {/* Mortgage calculator — sale only */}
            {property.type !== 'rent' && (
              <MortgageCalculator propertyPrice={property.price} />
            )}

            {/* Similar properties */}
            {similar.length > 0 && (
              <div style={{ marginTop: '48px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '16px', color: 'var(--near-black)' }}>
                  Similar Properties in {property.location?.area}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {similar.map(p => <MiniPropertyCard key={p.id} property={p} />)}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: sticky price/contact card ────────────────────────── */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '28px',
            position: 'sticky',
            top: '90px',
          }}>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Price
            </p>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--near-black)', marginBottom: '24px' }}>
              {priceLabel}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`https://wa.me/${property.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                💬 WhatsApp Agent
              </a>
              <a
                href={`tel:${property.whatsapp}`}
                style={{
                  background: 'var(--near-black)',
                  color: 'var(--cream)',
                  padding: '12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                📞 Call Agent
              </a>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Listed by PrimeHub. Response times average under 2 hours.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
