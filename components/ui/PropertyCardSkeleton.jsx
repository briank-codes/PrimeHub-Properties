export default function PropertyCardSkeleton() {
  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
    }}>
      <div style={{
        height: '200px',
        background: 'linear-gradient(90deg, var(--cream-dark) 25%, var(--cream) 50%, var(--cream-dark) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />
      <div style={{ padding: '20px' }}>
        <div style={{
          height: '12px',
          background: 'var(--cream-dark)',
          borderRadius: '4px',
          marginBottom: '16px',
          width: '40%',
        }} />
        <div style={{
          height: '20px',
          background: 'var(--cream-dark)',
          borderRadius: '4px',
          marginBottom: '12px',
          width: '80%',
        }} />
        <div style={{
          height: '16px',
          background: 'var(--cream-dark)',
          borderRadius: '4px',
          marginBottom: '12px',
          width: '60%',
        }} />
        <div style={{
          height: '36px',
          background: 'var(--cream-dark)',
          borderRadius: '4px',
          width: '30%',
        }} />
      </div>
    </div>
  )
}
