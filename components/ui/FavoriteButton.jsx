'use client'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function FavoriteButton({ propertyId }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorited = isFavorite(propertyId)

  return (
    <button
      onClick={function() { toggleFavorite(propertyId) }}
      style={{
        background: favorited ? '#F4C430' : 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1.2rem',
        transition: 'all 0.2s',
      }}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorited ? '★' : '☆'}
    </button>
  )
}