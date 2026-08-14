import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Smoothly scrolls to the top on every client-side route change.
 * Mount once inside the router (see App.tsx).
 */
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (hash) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [pathname, search, hash])

  return null
}
