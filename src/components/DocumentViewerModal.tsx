import { ExternalLink, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface DocumentViewerModalProps {
  isOpen: boolean
  title: string
  src: string
  openUrl: string
  onClose: () => void
}

export function DocumentViewerModal({
  isOpen,
  title,
  src,
  openUrl,
  onClose,
}: DocumentViewerModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setVisible(false)
      return
    }

    const frame = requestAnimationFrame(() => setVisible(true))
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className="fixed inset-0 z-[110] flex flex-col"
    >
      <div className="absolute inset-0 bg-stone-950/95" />

      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <p
          id={titleId}
          className="min-w-0 truncate text-sm font-semibold text-white/90"
        >
          {title}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Открыть в новой вкладке"
            className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ExternalLink size={18} aria-hidden="true" />
          </a>
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

      <div
        className={`relative z-10 flex min-h-0 flex-1 px-3 pb-4 sm:px-6 sm:pb-6 ${
          visible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-200`}
      >
        <iframe
          key={src}
          src={src}
          title={title}
          className="h-full w-full rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          allow="fullscreen"
        />
      </div>
    </div>,
    document.body,
  )
}
