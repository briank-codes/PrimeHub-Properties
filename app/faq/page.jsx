'use client'
import { useState } from 'react'
import { faqs } from '@/data/faqs'

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState(null)
  const [openQuestion, setOpenQuestion] = useState(null)

  function toggleCategory(category) {
    if (openCategory === category) {
      setOpenCategory(null)
    } else {
      setOpenCategory(category)
      setOpenQuestion(null)
    }
  }

  function toggleQuestion(question) {
    if (openQuestion === question) {
      setOpenQuestion(null)
    } else {
      setOpenQuestion(question)
    }
  }

  return (
    <div>
      <section style={{
        background: 'var(--cream)',
        padding: '80px 24px 60px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '16px',
          }}>
            Help Center
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            marginBottom: '16px',
          }}>
            Frequently Asked <em>Questions</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.7 }}>
            Everything you need to know about buying property in Kenya, from financing to legal requirements.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {faqs.map(function(category) {
            return (
              <div key={category.category} style={{ marginBottom: '48px' }}>
                <button
                  onClick={function() { toggleCategory(category.category) }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px',
                    background: 'var(--cream)',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    margin: 0,
                  }}>
                    {category.category}
                  </h2>
                  <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>
                    {openCategory === category.category ? '−' : '+'}
                  </span>
                </button>

                {openCategory === category.category && (
                  <div style={{ marginTop: '24px' }}>
                    {category.questions.map(function(qa) {
                      return (
                        <div key={qa.question} style={{ marginBottom: '16px' }}>
                          <button
                            onClick={function() { toggleQuestion(qa.question) }}
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '16px',
                              background: 'var(--white)',
                              border: '1px solid var(--border)',
                              cursor: 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <h3 style={{ fontSize: '1rem', margin: 0 }}>
                              {qa.question}
                            </h3>
                            <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                              {openQuestion === qa.question ? '−' : '+'}
                            </span>
                          </button>

                          {openQuestion === qa.question && (
                            <div style={{
                              padding: '16px 24px',
                              background: 'var(--cream)',
                              border: '1px solid var(--border)',
                              borderTop: 'none',
                              fontSize: '0.95rem',
                              lineHeight: 1.7,
                              color: 'var(--text-primary)',
                            }}>
                              {qa.answer}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section style={{
        background: 'var(--near-black)',
        color: 'var(--cream)',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{ marginBottom: '16px' }}>Still have questions?</h2>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '28px' }}>
          Our team is here to help. Reach out via WhatsApp or phone for personalized assistance.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/254712345678?text=Hi, I have a question about buying property in Kenya."
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#25D366',
              color: 'white',
              padding: '14px 32px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            WhatsApp Us
          </a>
          <a
            href="tel:+254712345678"
            style={{
              background: 'transparent',
              color: 'var(--cream)',
              padding: '14px 32px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Call Us
          </a>
        </div>
      </section>
    </div>
  )
}
