import type { ReactNode } from 'react'
import { LightboxImage } from './LightboxImage'
import type { LightboxImageItem } from './types'

interface ImageGalleryProps {
  images: LightboxImageItem[]
  className?: string
  getItemClassName?: (index: number) => string
  getImgClassName?: (index: number) => string
  sizes?: string
  renderItem?: (
    image: LightboxImageItem,
    index: number,
    defaultNode: ReactNode,
  ) => ReactNode
}

/**
 * Renders a gallery of clickable images that open in a shared lightbox group.
 * Navigation stays within this gallery only.
 */
export function ImageGallery({
  images,
  className,
  getItemClassName,
  getImgClassName,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  renderItem,
}: ImageGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className={className}>
      {images.map((image, index) => {
        const node = (
          <LightboxImage
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            images={images}
            index={index}
            className={getItemClassName?.(index) ?? 'size-full'}
            imgClassName={
              getImgClassName?.(index) ??
              'size-full object-cover object-center transition duration-500 group-hover:scale-105'
            }
            sizes={sizes}
          />
        )

        return renderItem ? (
          <div key={`${image.src}-${index}`}>{renderItem(image, index, node)}</div>
        ) : (
          node
        )
      })}
    </div>
  )
}
