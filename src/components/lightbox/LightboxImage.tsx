import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { assetUrl } from '../../lib/assetUrl'
import { useLightbox } from './useLightbox'
import type { LightboxImageItem } from './types'

interface LightboxImageProps {
  src: string
  alt: string
  /** Full gallery group. Defaults to the single image. */
  images?: LightboxImageItem[]
  /** Index of this image inside `images`. */
  index?: number
  className?: string
  imgClassName?: string
  style?: CSSProperties
  sizes?: string
  loading?: 'lazy' | 'eager'
  children?: ReactNode
  onOpen?: () => void
  onImageError?: () => void
}

export function LightboxImage({
  src,
  alt,
  images,
  index = 0,
  className,
  imgClassName = 'size-full object-cover object-center',
  style,
  sizes,
  loading = 'lazy',
  children,
  onOpen,
  onImageError,
}: LightboxImageProps) {
  const { openLightbox } = useLightbox()
  const resolvedSrc = assetUrl(src)
  const gallery =
    images && images.length > 0
      ? images.map((image) => ({ ...image, src: assetUrl(image.src) }))
      : [{ src: resolvedSrc, alt }]

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    openLightbox({ images: gallery, index })
    onOpen?.()
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label={`Открыть фото: ${alt}`}
      className={`group relative block overflow-hidden p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
        className ?? 'size-full'
      }`}
      style={style}
    >
      <img
        src={resolvedSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        sizes={sizes}
        className={`pointer-events-none ${imgClassName}`}
        draggable={false}
        onError={onImageError}
      />
      {children}
    </button>
  )
}
