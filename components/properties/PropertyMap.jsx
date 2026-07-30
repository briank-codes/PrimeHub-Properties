'use client'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'

export default function PropertyMap({ lat, lng, title, area }) {
  const position = [lat, lng]

  return (
    <div style={{ width: '100%', minHeight: '350px', borderRadius: '8px', overflow: 'hidden', marginBottom: '32px' }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '350px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <CircleMarker
          center={position}
          radius={12}
          pathOptions={{ color: '#1A1A16', fillColor: '#4A4A3A', fillOpacity: 0.8 }}
        >
          <Popup>
            <strong>{title}</strong>
            <br />{area}
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  )
}
