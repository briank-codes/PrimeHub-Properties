'use client'
import { useState } from 'react'

function formatKES(amount) {
  if (amount >= 1000000) return 'KSh ' + (amount / 1000000).toFixed(1) + 'M'
  if (amount >= 1000) return 'KSh ' + (amount / 1000).toFixed(0) + 'K'
  return 'KSh ' + amount.toLocaleString()
}

export default function MortgageCalculator({ propertyPrice }) {
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8) // Default 80% loan
  const [interestRate, setInterestRate] = useState(13)
  const [loanYears, setLoanYears] = useState(20)

  // Mortgage calculation
  const monthlyRate = interestRate / 100 / 12
  const numPayments = loanYears * 12
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  const totalPayment = monthlyPayment * numPayments
  const totalInterest = totalPayment - loanAmount

  return (
    <div style={{
      background: 'var(--cream)',
      border: '1px solid var(--border)',
      padding: '32px',
      marginTop: '32px',
    }}>
      <h3 style={{ marginBottom: '24px' }}>Mortgage Calculator</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { label: 'Loan Amount', value: loanAmount, min: propertyPrice * 0.5, max: propertyPrice, step: 100000, setter: setLoanAmount, display: formatKES(loanAmount) },
            { label: 'Interest Rate', value: interestRate, min: 5, max: 25, step: 0.5, setter: setInterestRate, display: `${interestRate}%` },
            { label: 'Loan Period', value: loanYears, min: 1, max: 30, step: 1, setter: setLoanYears, display: `${loanYears} yrs` },
          ].map(function(slider) {
            return (
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
                  onChange={function(e) { slider.setter(Number(e.target.value)) }}
                  style={{ width: '100%', accentColor: 'var(--near-black)' }}
                />
              </div>
            )
          })}
        </div>

        {/* Results */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', padding: '24px' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Monthly Repayment
          </p>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '16px', color: 'var(--near-black)' }}>
            {isNaN(monthlyPayment) ? 'KSh —' : `KSh ${Math.round(monthlyPayment).toLocaleString()}`}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Principal', value: formatKES(loanAmount) },
              { label: 'Total Interest', value: isNaN(totalInterest) ? '—' : formatKES(Math.round(totalInterest)) },
              { label: 'Total Payment', value: isNaN(totalPayment) ? '—' : formatKES(Math.round(totalPayment)) },
            ].map(function(row) {
              return (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                  <span style={{ fontWeight: 600 }}>{row.value}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.5 }}>
        * This is an estimate. Actual mortgage rates may vary based on your credit score and lender terms.
      </p>
    </div>
  )
}