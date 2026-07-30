export default function VirtualTour({ videoUrl, title }) {
  if (!videoUrl) {
    return null
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px' }}>Virtual Tour</h3>
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%', /* 16:9 aspect ratio */
        height: 0,
        overflow: 'hidden',
        borderRadius: '8px',
        background: 'var(--cream-dark)',
      }}>
        <iframe
          src={videoUrl}
          title={`Virtual tour of ${title}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}