'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { properties, locations } from '@/data/properties'
import CounterStats from '@/components/ui/CounterStats'
import FavoriteButton from '@/components/ui/FavoriteButton'
import FallbackImage from '@/components/ui/FallbackImage'
import LeadMagnet from '@/components/ui/marketing/LeadMagnet'
import VideoTestimonials from '@/components/ui/marketing/VideoTestimonials'
import SoldProperties from '@/components/ui/marketing/SoldProperties'

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatKES(amount) {
  if (amount >= 1000000) return `KSh ${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `KSh ${(amount / 1000).toFixed(0)}K`
  return `KSh ${amount.toLocaleString()}`
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedNumber({ end, suffix = '', duration = 1600, start }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    let frame

    function tick(timestamp) {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out for a smoother finish
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setCount(end)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, end, duration])

  return <>{count.toLocaleString()}{suffix}</>
}

// ─── Why Buy Here Data ───────────────────────────────────────────────────────
const whyBuyReasons = [
  { icon: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop', title: 'Healthcare Access', desc: 'Every location we list has verified proximity to hospitals and clinics.' },
  { icon: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop', title: 'Quality Schools', desc: 'From primary to university — our areas have strong education infrastructure.' },
  { icon: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=100&h=100&fit=crop', title: 'Road Connectivity', desc: 'Tarmac access, SGR proximity, and highway links built into every listing.' },
  { icon: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=100&h=100&fit=crop', title: 'Fair Pricing', desc: 'No inflated quotes. We research market rates so you pay what land is worth.' },
]

const locationDetails = {
  Nanyuki: { climate: 'Cool Mt Kenya climate, 1800m altitude', schools: 'Nanyuki Primary, Ol Pejeta school nearby', roads: 'Tarmac A2 highway, airstrip access', pricing: 'Plots from KSh 4.5M' },
  Kiambu: { climate: 'Mild highland climate, green surroundings', schools: 'Multiple top schools within 5km', roads: '20 mins from Nairobi via Kiambu Road', pricing: 'Plots from KSh 3.2M' },
  Nakuru: { climate: 'Warm, dry, lake region atmosphere', schools: 'Nakuru Boys, Girls High, several universities', roads: 'A104 highway, 2hrs from Nairobi', pricing: 'Homes from KSh 8M' },
  Kajiado: { climate: 'Warm semi-arid, clean open air', schools: 'Growing school infrastructure', roads: '30 mins from JKIA, near Southern Bypass', pricing: 'Plots from KSh 1.8M' },
  Eldoret: { climate: 'Cool highland, 2100m altitude', schools: 'Moi University, several national schools', roads: 'A104 highway, Eldoret Airport nearby', pricing: 'Apartments from KSh 35K/mo' },
  Machakos: { climate: 'Warm, dry, scenic hills', schools: 'Good primary and secondary options', roads: 'Near SGR Syokimau, Mombasa Road access', pricing: 'Plots from KSh 950K' },
  Mombasa: { climate: 'Tropical, warm year-round, ocean breeze', schools: 'International schools, Coast university', roads: 'SGR terminus, Mombasa-Nairobi highway', pricing: 'Villas from KSh 42M' },
  'Kangundo Road': { climate: 'Warm, semi-humid, agricultural zone', schools: 'Growing education infrastructure', roads: 'Tarmac Kangundo Road, 30 mins from CBD', pricing: 'Plots from KSh 950K' },
}

// ─── Testimonials ────────────────────────────────────────────────────────────
const testimonials = [
  { name: 'James Mwangi', location: 'Kiambu', quote: 'Nilinunua plot yangu kwa bei nzuri sana. PrimeHub walinisaidia kupata ardhi bora karibu na Nairobi.', stars: 5 },
  { name: 'Grace Achieng', location: 'Mombasa', quote: 'The beachside villa exceeded all my expectations. Professional team, honest pricing, smooth process.', stars: 5 },
  { name: 'Peter Kamau', location: 'Nakuru', quote: 'Nilikuwa natafuta nyumba Nakuru kwa miaka miwili. PrimeHub walinikuta ndani ya wiki mbili.', stars: 5 },
  { name: 'Susan Wanjiku', location: 'Nanyuki', quote: 'The Nanyuki home is everything — cool weather, peaceful, and close to town. Best investment I have made.', stars: 5 },
  { name: 'David Otieno', location: 'Eldoret', quote: 'Apartment yangu Eldoret ni bora kabisa. Salama, safi, karibu na chuo kikuu. Asante PrimeHub!', stars: 5 },
  { name: 'Mary Njeri', location: 'Kangundo Road', quote: 'I got my first plot at a price I could afford. The title deed came within 60 days. Highly recommend.', stars: 5 },
]

// ─── Components ─────────────────────────────────────────────────────────────
function PropertyCard({ property }) {
  const isPlot = property.category === 'plot'
  const priceLabel = property.type === 'rent'
    ? `${formatKES(property.price)}/mo`
    : formatKES(property.price)

  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s, transform 0.2s',
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
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{isPlot ? 'Plot' : 'Home'}</div>
        )}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: property.type === 'rent' ? 'var(--olive)' : 'var(--near-black)',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          {property.type === 'rent' ? 'For Rent' : 'For Sale'}
        </span>
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <FavoriteButton propertyId={property.id} />
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>
          {property.title}
        </h3>

        <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          📍 {property.location.area}
        </p>

        {!isPlot && (
          <div style={{
            display: 'flex',
            gap: '18px',
            marginBottom: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}>
            <span>🛏️ {property.specs.bedrooms} Beds</span>
            <span>🛁 {property.specs.bathrooms} Baths</span>
            <span>📐 {property.specs.size}m²</span>
          </div>
        )}
        {isPlot && (
          <div style={{
            marginBottom: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}>
            📐 {property.specs.size}x100 ft plot
          </div>
        )}

        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--near-black)', marginBottom: '14px' }}>
          {priceLabel}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            href="/properties"
            style={{
              flex: 1,
              background: 'transparent',
              color: 'var(--olive)',
              border: '1.5px solid var(--olive)',
              padding: '11px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              textAlign: 'center',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeLocation, setActiveLocation] = useState('Nanyuki')
  const [activeSearchTab, setActiveSearchTab] = useState('Buy')
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [interestRate, setInterestRate] = useState(13)
  const [loanYears, setLoanYears] = useState(20)

  // Stats bar counter trigger
  const statsRef = useRef(null)
  const [statsInView, setStatsInView] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const featured = properties.filter(p => p.featured)

  const monthlyRate = interestRate / 100 / 12
  const numPayments = loanYears * 12
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  const totalPayment = monthlyPayment * numPayments
  const totalInterest = totalPayment - loanAmount

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--cream)',
        padding: '60px 24px 0',
      }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', width: '100%' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '56px', alignItems: 'center' }}>

            {/* Left — Text */}
            <div>
              <p style={{ fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600, marginBottom: '20px' }}>
                Find Your Perfect Space
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
                lineHeight: 1.15,
                marginBottom: '20px',
                color: 'var(--near-black)',
              }}>
                Find Your<br />
                <span style={{ color: 'var(--olive)' }}>Dream Home</span><br />
                in Kenya
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px', maxWidth: '420px' }}>
                From Mombasa beaches to Nanyuki highlands — we connect Kenyans with land and homes in the right location, at the right price.
              </p>

              {/* CTAs — styled to match Navbar buttons exactly */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '28px' }}>
                <Link href="/properties" style={{
                  background: 'var(--near-black)',
                  color: 'var(--cream)',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}>
                  Browse Properties
                </Link>
                <a href="https://wa.me/254712345678?text=Hi, I am interested in finding a property in Kenya" target="_blank" rel="noreferrer" style={{
                  background: '#25D366',
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}>
                  WhatsApp Us
                </a>
              </div>

              {/* Avatar trust row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex' }}>
                  {['J', 'M', 'S'].map((letter, i) => (
                    <div key={letter} style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'var(--olive-light)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: '2px solid var(--cream)',
                      marginLeft: i === 0 ? 0 : '-10px',
                    }}>
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--near-black)' }}>5,000+ Happy Clients</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Trusted by families across Kenya</div>
                </div>
              </div>
            </div>

            {/* Right — Featured image + search bar overlay */}
            <div style={{ position: 'relative' }}>
              <div style={{
                height: '420px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <FallbackImage
                  src="/images/properties/mombasa-villa.png"
                  alt="Featured property"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Search/filter bar */}
              <div style={{
                position: 'absolute',
                bottom: '-1px',
                left: '20px',
                right: '20px',
                background: '#fff',
                borderRadius: '14px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                padding: '18px 20px',
              }}>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  {['Buy', 'Rent', 'Plots', 'Commercial'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveSearchTab(tab)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: activeSearchTab === tab ? 'var(--olive)' : 'var(--text-muted)',
                        borderBottom: activeSearchTab === tab ? '2px solid var(--olive)' : '2px solid transparent',
                        paddingBottom: '10px',
                        marginBottom: '-13px',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Location</label>
                    <select style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.82rem', background: '#fff' }}>
                      <option>Any Location</option>
                      {locations.map(loc => <option key={loc.name}>{loc.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Property Type</label>
                    <select style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.82rem', background: '#fff' }}>
                      <option>Any Type</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Plot</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Min Price</label>
                    <input type="text" placeholder="KSh Min" style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.82rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Max Price</label>
                    <input type="text" placeholder="KSh Max" style={{ width: '100%', padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.82rem' }} />
                  </div>
                  <button style={{
                    background: 'var(--olive)',
                    color: '#fff',
                    border: 'none',
                    padding: '9px 18px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}>
                    🔍 Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar — icon-based, animated counters */}
          <div
            ref={statsRef}
            className="four-col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0',
              marginTop: '90px',
              padding: '28px 32px',
              background: 'var(--cream-dark)',
              borderRadius: '12px',
            }}
          >
            {[
              { icon: '👥', end: 5000, suffix: '+', label: 'Happy Clients' },
              { icon: '📍', end: 8, suffix: '+', label: 'Locations' },
              { icon: '🏠', end: 12, suffix: '+', label: 'Active Listings' },
              { icon: '✅', end: 100, suffix: '%', label: 'Trusted & Verified' },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                borderLeft: i !== 0 ? '1px solid var(--border)' : 'none',
                paddingLeft: i !== 0 ? '24px' : '0',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(27,77,62,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.1, color: 'var(--near-black)' }}>
                    <AnimatedNumber end={stat.end} suffix={stat.suffix} start={statsInView} />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-padding)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600, marginBottom: '8px' }}>
                Featured Properties
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem' }}>
                Handpicked Properties for You
              </h2>
            </div>
            <Link href="/properties" style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}>
              View all properties →
            </Link>
          </div>

          <div className="properties-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {featured.slice(0, 4).map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ── WHY BUY HERE ─────────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-padding)', background: 'var(--cream-dark)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '48px', maxWidth: '600px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600, marginBottom: '12px' }}>
              Why Choose PrimeHub?
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '12px' }}>
              We make property ownership simple and secure.
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              We take the stress out of finding the right property. Our expert team ensures a smooth and transparent experience from search to ownership.
            </p>
          </div>

          <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '56px' }}>
            {whyBuyReasons.map(reason => (
              <div key={reason.title} style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px 20px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(27,77,62,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px',
                }}>
                  <FallbackImage src={reason.icon} alt={reason.title} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '8px', color: 'var(--near-black)' }}>
                  {reason.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Explore by location
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              {Object.keys(locationDetails).map(loc => (
                <button key={loc} onClick={() => setActiveLocation(loc)} style={{
                  background: activeLocation === loc ? 'var(--olive)' : 'transparent',
                  color: activeLocation === loc ? '#fff' : 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}>
                  {loc}
                </button>
              ))}
            </div>
            {activeLocation && locationDetails[activeLocation] && (
              <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {[
                  { label: 'Climate', value: locationDetails[activeLocation].climate },
                  { label: 'Schools', value: locationDetails[activeLocation].schools },
                  { label: 'Roads', value: locationDetails[activeLocation].roads },
                  { label: 'Pricing', value: locationDetails[activeLocation].pricing },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--olive)', fontWeight: 600, marginBottom: '6px' }}>{item.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ────────────────────────────────────────────────────── */}
      <section id="locations" style={{ padding: 'var(--section-padding)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600, marginBottom: '8px' }}>
              Popular Locations
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem' }}>
              8 Locations Across Kenya
            </h2>
          </div>

          <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
            {locations.slice(0, 6).map(loc => (
              <div key={loc.name} style={{
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                height: '150px',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--cream-dark)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(20,52,42,0.85), transparent)',
                  padding: '12px',
                  color: '#fff',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600 }}>{loc.name}</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>{loc.why}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-padding)', background: 'var(--cream-dark)' }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600, marginBottom: '8px' }}>
              Happy Clients
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem' }}>
              What Our Clients Say
            </h2>
          </div>

          <div className="properties-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
            {testimonials.slice(0, 3).map(t => (
              <div key={t.name} style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <div style={{ fontSize: '1.6rem', color: 'var(--olive)', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>"</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '18px' }}>
                  {t.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--olive)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.location}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#F4C430', fontSize: '0.8rem' }}>
                    {'★'.repeat(t.stars)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CounterStats />
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ───────────────────────────────────────────── */}
      <VideoTestimonials />

      {/* ── RECENTLY SOLD ───────────────────────────────────────────────── */}
      <SoldProperties />

      {/* ── LEAD MAGNET ───────────────────────────────────────────────────── */}
      <LeadMagnet />

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 60px' }}>
        <div style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          background: 'var(--olive)',
          borderRadius: '16px',
          padding: '36px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginBottom: '4px' }}>
              Ready to find your dream property?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
              Let us help you discover the perfect place to call home.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/properties" style={{
              background: '#fff',
              color: 'var(--olive)',
              padding: '12px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
            }}>
              Browse Properties
            </Link>
            <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer" style={{
              background: 'transparent',
              color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.4)',
              padding: '12px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
            }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── MORTGAGE CALCULATOR ──────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-padding)', background: 'var(--white)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--olive)', fontWeight: 600, marginBottom: '8px' }}>
              Plan your purchase
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem' }}>
              Mortgage Calculator
            </h2>
          </div>

          <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {[
                { label: 'Loan Amount', value: loanAmount, min: 500000, max: 50000000, step: 100000, setter: setLoanAmount, display: formatKES(loanAmount) },
                { label: 'Interest Rate', value: interestRate, min: 5, max: 25, step: 0.5, setter: setInterestRate, display: `${interestRate}%` },
                { label: 'Loan Period', value: loanYears, min: 1, max: 30, step: 1, setter: setLoanYears, display: `${loanYears} yrs` },
              ].map(slider => (
                <div key={slider.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{slider.label}</label>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{slider.display}</span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={slider.value}
                    onChange={e => slider.setter(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--olive)' }}
                  />
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Monthly Repayment
              </p>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, marginBottom: '24px', color: 'var(--near-black)' }}>
                {isNaN(monthlyPayment) ? 'KSh —' : `KSh ${Math.round(monthlyPayment).toLocaleString()}`}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Principal', value: formatKES(loanAmount) },
                  { label: 'Total Interest', value: isNaN(totalInterest) ? '—' : formatKES(Math.round(totalInterest)) },
                  { label: 'Total Payment', value: isNaN(totalPayment) ? '—' : formatKES(Math.round(totalPayment)) },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                    <span style={{ fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/254712345678?text=I used your mortgage calculator and I'm ready to buy." target="_blank" rel="noreferrer" style={{
                display: 'block',
                marginTop: '24px',
                background: 'var(--olive)',
                color: '#fff',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}>
                Talk to an Agent →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}