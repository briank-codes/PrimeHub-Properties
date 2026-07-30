'use client'
import { useState, useEffect } from 'react'

export default function MapView({ properties, onPropertyClick }) {
  const [MapComponents, setMapComponents] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const validProperties = (properties || []).filter(
    p => p.location?.coordinates?.lat != null && p.location?.coordinates?.lng != null &&
         isFinite(Number(p.location.coordinates.lat)) && isFinite(Number(p.location.coordinates.lng))
  )

  useEffect(() => {
    Promise.all([import('leaflet'), import('react-leaflet')]).then(([L, RL]) => {
      delete L.default.Icon.Default.prototype._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })
      setMapComponents(RL)
    })
  }, [])

  function handleSelect(property) {
    setSelectedId(property.id)
    if (onPropertyClick) onPropertyClick(property.id)
  }

  // Kenya center fallback if no valid properties
  const center = validProperties.length > 0
    ? [Number(validProperties[0].location.coordinates.lat), Number(validProperties[0].location.coordinates.lng)]
    : [-0.0236, 37.9062]

  return (
    <div style={{ height: '600px', background: 'var(--cream-dark)', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', height: '100%' }}>

        {/* Map */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
          {!MapComponents ? (
            <div style={{
              height: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem',
            }}>
              Loading map…
            </div>
          ) : (() => {
            const { MapContainer, TileLayer, Marker, Popup } = MapComponents
            return (
              <MapContainer
                center={center}
                zoom={6}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {validProperties.map(property => (
                  <Marker
                    key={property.id}
                    position={[Number(property.location.coordinates.lat), Number(property.location.coordinates.lng)]}
                    eventHandlers={{ click: () => handleSelect(property) }}
                  >
                    <Popup>
                      <strong>{property.title}</strong><br />
                      {property.location.area}<br />
                      <span style={{ fontWeight: 600 }}>
                        {property.type === 'rent'
                          ? `KSh ${(property.price / 1000).toFixed(0)}K/mo`
                          : `KSh ${(property.price / 1000000).toFixed(1)}M`}
                      </span>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )
          })()}

          <div style={{
            position: 'absolute', bottom: '16px', left: '16px', zIndex: 1000,
            background: 'var(--white)', padding: '12px 16px', borderRadius: '4px',
            fontSize: '0.8rem', color: 'var(--text-muted)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}>
            Showing {validProperties.length} of {(properties || []).length} properties
            {validProperties.length < (properties || []).length && ' (some missing coordinates)'}
          </div>
        </div>

        {/* Property List */}
        <div style={{ background: 'var(--white)', borderLeft: '1px solid var(--border)', overflow: 'auto', padding: '16px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Properties</h3>
          {(properties || []).length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No properties to display.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(properties || []).map(property => (
                <div
                  key={property.id}
                  onClick={() => handleSelect(property)}
                  style={{
                    padding: '12px',
                    border: `1px solid ${selectedId === property.id ? 'var(--near-black)' : 'var(--border)'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: selectedId === property.id ? 'var(--cream-dark)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {property.location?.area}
                  </p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{property.title}</h4>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--near-black)' }}>
                    {property.type === 'rent'
                      ? `KSh ${(property.price / 1000).toFixed(0)}K/mo`
                      : `KSh ${(property.price / 1000000).toFixed(1)}M`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
