import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react'
import { createPortal } from 'react-dom'
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  X,
} from 'lucide-react'
import type { LightboxImageItem } from './types'
import { assetUrl } from '../../lib/assetUrl'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.25

interface LightboxModalProps {
  isOpen: boolean
  images: LightboxImageItem[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

export function LightboxModal({
  isOpen,
  images,
  index,
  onIndexChange,
  onClose,
}: LightboxModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map())
  const pinchStartRef = useRef<{ distance: number; zoom: number } | null>(null)
  const dragRef = useRef<{
    x: number
    y: number
    offsetX: number
    offsetY: number
    swiping: boolean
  } | null>(null)
  const [swipeY, setSwipeY] = useState(0)

  const total = images.length
  const current = images[index]
  const canNavigate = total > 1

  const resetView = useCallback(() => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
    setSwipeY(0)
    pinchStartRef.current = null
    dragRef.current = null
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setVisible(false)
      resetView()
      return
    }

    const frame = requestAnimationFrame(() => setVisible(true))
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 30)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, resetView])

  useEffect(() => {
    resetView()
  }, [index, resetView])

  const goPrev = useCallback(() => {
    if (!canNavigate) return
    onIndexChange((index - 1 + total) % total)
  }, [canNavigate, index, onIndexChange, total])

  const goNext = useCallback(() => {
    if (!canNavigate) return
    onIndexChange((index + 1) % total)
  }, [canNavigate, index, onIndexChange, total])

  const setZoomClamped = useCallback((value: number) => {
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value))
    setZoom(next)
    if (next <= MIN_ZOOM) {
      setOffset({ x: 0, y: 0 })
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
        return
      }
      if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        setZoomClamped(zoom + ZOOM_STEP)
        return
      }
      if (event.key === '-' || event.key === '_') {
        event.preventDefault()
        setZoomClamped(zoom - ZOOM_STEP)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev, isOpen, onClose, setZoomClamped, zoom])

  const onDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !dialogRef.current) return

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!current) return
    event.preventDefault()
    const delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    setZoomClamped(zoom + delta)
  }

  const pointerDistance = () => {
    const points = [...pointersRef.current.values()]
    if (points.length < 2) return 0
    const [a, b] = points
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })

    if (pointersRef.current.size === 2) {
      pinchStartRef.current = {
        distance: pointerDistance(),
        zoom,
      }
      dragRef.current = null
      return
    }

    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
      swiping: zoom <= MIN_ZOOM,
    }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const distance = pointerDistance()
      if (pinchStartRef.current.distance > 0) {
        const ratio = distance / pinchStartRef.current.distance
        setZoomClamped(pinchStartRef.current.zoom * ratio)
      }
      return
    }

    const drag = dragRef.current
    if (!drag) return

    const dx = event.clientX - drag.x
    const dy = event.clientY - drag.y

    if (zoom > MIN_ZOOM) {
      setOffset({
        x: drag.offsetX + dx,
        y: drag.offsetY + dy,
      })
      return
    }

    if (Math.abs(dy) > Math.abs(dx) && dy > 0) {
      setSwipeY(dy)
    } else if (Math.abs(dx) > 40 && canNavigate) {
      drag.swiping = true
    }
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const start = pointersRef.current.get(event.pointerId)
    pointersRef.current.delete(event.pointerId)

    if (pointersRef.current.size < 2) {
      pinchStartRef.current = null
    }

    if (pointersRef.current.size === 0 && drag && start) {
      const dx = event.clientX - drag.x
      const dy = event.clientY - drag.y

      if (zoom <= MIN_ZOOM) {
        if (dy > 120) {
          onClose()
        } else if (canNavigate && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) goNext()
          else goPrev()
        }
      }
    }

    if (pointersRef.current.size === 0) {
      dragRef.current = null
      setSwipeY(0)
    }

    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // ignore
    }
  }

  if (!isOpen || !current) return null

  const backdropOpacity = visible ? Math.max(0.45, 1 - swipeY / 360) : 0

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      onKeyDown={onDialogKeyDown}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ opacity: backdropOpacity }}
    >
      <button
        type="button"
        aria-label="Закрыть просмотр"
        className="absolute inset-0 bg-stone-950/90 transition-opacity duration-300"
        onClick={onClose}
      />

      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <p id={titleId} className="min-w-0 truncate text-sm font-semibold text-white/90">
          {total > 1 ? `Фото ${index + 1} из ${total}` : current.alt}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Уменьшить"
            onClick={() => setZoomClamped(zoom - ZOOM_STEP)}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Minus size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Увеличить"
            onClick={() => setZoomClamped(zoom + ZOOM_STEP)}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Plus size={18} aria-hidden="true" />
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 pb-6 sm:px-8">
        {canNavigate && (
          <button
            type="button"
            aria-label="Предыдущее фото"
            onClick={goPrev}
            className="absolute left-2 z-20 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4 sm:size-12"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
        )}

        <div
          className={`flex h-full w-full max-w-6xl items-center justify-center touch-none transition duration-300 ${
            visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            src={assetUrl(current.src)}
            alt={current.alt}
            draggable={false}
            className="max-h-[min(82vh,900px)] max-w-full select-none object-contain"
            style={{
              transform: `translate(${offset.x}px, ${offset.y + swipeY}px) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          />
        </div>

        {canNavigate && (
          <button
            type="button"
            aria-label="Следующее фото"
            onClick={goNext}
            className="absolute right-2 z-20 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:size-12"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        )}
      </div>

      {total > 1 && (
        <p className="relative z-10 pb-5 text-center text-xs font-medium tracking-[0.14em] text-white/60">
          {index + 1} / {total}
        </p>
      )}
    </div>,
    document.body,
  )
}
