import { createContext, useContext } from 'react'
import type { OpenLightboxOptions } from './types'

export interface LightboxContextValue {
  openLightbox: (options: OpenLightboxOptions) => void
  closeLightbox: () => void
}

export const LightboxContext = createContext<LightboxContextValue | null>(null)

export function useLightbox() {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within LightboxProvider')
  }
  return context
}
