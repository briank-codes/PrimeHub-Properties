'use client'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0)

  useEffect(function() {
    if (!start) return
    let startTime = null
    const numeric = parseInt(target.replace(/\D/g, ''))

    function animate(timestamp) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * numeric))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [start, target, duration])

  return count
}

function StatItem({ num, label, duration }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const count = useCountUp(num, duration, started)

  const suffix = num.replace(/[0-9,]/g, '')

  useEffect(function() {
    const observer = new IntersectionObserver(
      function(entries) {
        if (entries[0].isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return function() { observer.disconnect() }
  }, [])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2.5rem',
        fontWeight: 700,
        color: 'var(--cream)',
        marginBottom: '8px',
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'rgba(245,240,232,0.5)',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function CounterStats() {
  const stats = [
    { num: '5000+', label: 'Properties Sold', duration: 2000 },
    { num: '8', label: 'Counties Covered', duration: 800 },
    { num: '10+', label: 'Years Experience', duration: 1000 },
    { num: '98+', label: 'Client Satisfaction %', duration: 1500 },
  ]

  return (
    <section style={{
      background: 'var(--near-black)',
      padding: '60px 24px',
    }}>
      <div className="four-col" style={{
        maxWidth: 'var(--container-width)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
      }}>
        {stats.map(function(stat) {
          return (
            <StatItem
              key={stat.label}
              num={stat.num}
              label={stat.label}
              duration={stat.duration}
            />
          )
        })}
      </div>
    </section>
  )
}
