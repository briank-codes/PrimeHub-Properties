'use client'
import { useFavorites } from '@/contexts/FavoritesContext'
import { properties } from '@/data/properties'
import Link from 'next/link'
import FavoriteButton from '@/components/ui/FavoriteButton'

function formatKES(amount) {
  if (amount >= 1000000) return 'KSh ' + (amount / 1000000).toFixed(1) + 'M'
  if (amount >= 1000) return 'KSh ' + (amount / 1000).toFixed(0) + 'K'
  return 'KSh ' + amount.toLocaleString()
}

function PropertyCard({ property }) {
  const isPlot = property.category === 'plot'
  const priceLabel = property.type === 'rent'
    ? formatKES(property.price) + '/mo'
    : formatKES(property.price)

  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, var(--cream-dark) 0%, var(--olive-light) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {property.image ? (
          <FallbackImage
            src={property.image}
            alt={property.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{isPlot ? 'Plot' : 'Home'}</div>
        )}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: property.type === 'rent' ? 'var(--olive)' : 'var(--near-black)',
          color: 'var(--cream)',
          padding: '4px 10px',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          {property.type === 'rent' ? 'For Rent' : 'For Sale'}
        </span>
      </div>

      <div style={{ padding: '20px' }}>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {property.location.area}
        </p>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '8px',
          fontFamily: 'var(--font-display)',
        }}>
          {property.title}
        </h3>

        {isPlot ? (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            {property.specs.size + 'x100 ft plot'}
          </p>
        ) : (
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '12px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}>
            <span>{property.specs.bedrooms + ' bed'}</span>
            <span>{property.specs.bathrooms + ' bath'}</span>
            <span>{property.specs.size + 'm²'}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 600,
          }}>
            {priceLabel}
          </span>
          <FavoriteButton propertyId={property.id} />
        </div>
      </div>
    </div>
    </Link>
  )
}

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  
  const favoriteProperties = properties.filter(function(p) {
    return favorites.includes(p.id)
  })

  return (
    <div>
      <section style={{
        background: 'var(--cream)',
        padding: '60px 24px 40px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '8px',
          }}>
            Saved Properties
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            marginBottom: '8px',
          }}>
            Your Favorites
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {favoriteProperties.length + ' properties saved'}
          </p>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding)', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
          {favoriteProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
                No favorites yet
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                Start saving properties you're interested in by clicking the star icon.
              </p>
              <Link href="/properties" style={{
                background: 'var(--near-black)',
                color: 'var(--cream)',
                padding: '12px 24px',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}>
                Browse Properties
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}>
              {favoriteProperties.map(function(p) {
                return <PropertyCard key={p.id} property={p} />
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}