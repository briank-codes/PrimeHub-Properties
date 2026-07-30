'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on mount
  useEffect(function() {
    const saved = localStorage.getItem('primehub_favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(function() {
    localStorage.setItem('primehub_favorites', JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(propertyId) {
    setFavorites(function(prev) {
      if (prev.includes(propertyId)) {
        return prev.filter(function(id) { return id !== propertyId })
      } else {
        return [...prev, propertyId]
      }
    })
  }

  function isFavorite(propertyId) {
    return favorites.includes(propertyId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}