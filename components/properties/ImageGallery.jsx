'use client'
import { useState } from 'react'

export default function ImageGallery({ images, title }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Main image */}
      <div style={{
        position: 'relative',
        height: '500px',
        background: 'var(--cream-dark)',
        overflow: 'hidden',
        marginBottom: '12px',
      }}>
        <img
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {images.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '0.8rem',
          }}>
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '8px',
        }}>
          {images.map(function(image, index) {
            return (
              <button
                key={index}
                onClick={function() { setSelectedIndex(index) }}
                style={{
                  height: '80px',
                  border: selectedIndex === index ? '2px solid var(--near-black)' : '2px solid transparent',
                  padding: '0',
                  background: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '4px',
                }}
              >
                <img
                  src={image}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}