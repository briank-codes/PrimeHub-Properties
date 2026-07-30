"use client"
import React from 'react'

export default function VideoTestimonials() {
  const videos = [
  
 
    { id: 'vid-3', title: 'Happy Client Testimonial', src: 'https://www.youtube.com/embed/o_fPVA1k8Uc' },
  ]

  return (
    <section style={{ padding: '60px 24px', background: 'var(--white)' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '16px' }}>Video Testimonials</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {videos.map(v => (
            <div key={v.id} style={{ background: 'var(--cream)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe title={v.title} src={v.src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} allowFullScreen />
              </div>
              <div style={{ marginTop: '8px', fontWeight: 600 }}>{v.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}