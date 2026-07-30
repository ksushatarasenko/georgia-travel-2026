import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LightboxModal } from './LightboxModal'
import type { LightboxImageItem } from './types'
import { LightboxContext } from './useLightbox'

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<LightboxImageItem[]>([])
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = useCallback(
    ({ images: nextImages, index: nextIndex = 0 }: { images: LightboxImageItem[]; index?: number }) => {
      if (nextImages.length === 0) return
      const safeIndex = Math.min(Math.max(nextIndex, 0), nextImages.length - 1)
      setImages(nextImages)
      setIndex(safeIndex)
      setIsOpen(true)
    },
    [],
  )

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({ openLightbox, closeLightbox }),
    [openLightbox, closeLightbox],
  )

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <LightboxModal
        isOpen={isOpen}
        images={images}
        index={index}
        onIndexChange={setIndex}
        onClose={closeLightbox}
      />
    </LightboxContext.Provider>
  )
}
