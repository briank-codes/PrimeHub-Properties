'use client'

import { useEffect, useState } from 'react'

const FALLBACK_SRC = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f2ee"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" fill="%23999"%3EImage not available%3C/text%3E%3C/svg%3E'

export default function FallbackImage({ src, alt = '', onError, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_SRC)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_SRC)
    setHasError(false)
  }, [src])

  function handleError(event) {
    if (!hasError) {
      setHasError(true)
      setCurrentSrc(FALLBACK_SRC)
    }
    if (typeof onError === 'function') {
      onError(event)
    }
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  )
}
