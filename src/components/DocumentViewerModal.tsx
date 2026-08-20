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
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [visible, setVisible] = useState(false)
  const [iframeBlocked, setIframeBlocked] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setVisible(false)
      setIframeBlocked(false)
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

  useEffect(() => {
    if (!isOpen) return

    const timer = window.setTimeout(() => {
      const iframe = iframeRef.current
      if (!iframe) return

      try {
        const frameDocument = iframe.contentDocument
        if (!frameDocument) return

        const bodyText = frameDocument.body?.innerText?.trim() ?? ''
        const isErrorPage =
          /refused to connect|x-frame-options|cannot be displayed|access denied|403 forbidden|404 not found/i.test(
            bodyText,
          )

        if (isErrorPage || bodyText.length === 0) {
          setIframeBlocked(true)
        }
      } catch {
        // Cross-origin — iframe loaded; fallback stays available in footer.
      }
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [isOpen, src])

  const handleIframeError = () => {
    setIframeBlocked(true)
  }

  if (!isOpen) return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className="fixed inset-0 z-[110] flex flex-col p-0 sm:p-3 md:p-4"
    >
      <div className="absolute inset-0 bg-stone-950/95 sm:rounded-[1.75rem]" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden sm:rounded-[1.5rem]">
        <header className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <p
            id={titleId}
            className="min-w-0 truncate text-sm font-semibold text-white/90 sm:text-base"
          >
            {title}
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={openUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Открыть во внешнем браузере"
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
          className={`relative flex min-h-0 flex-1 flex-col px-3 pb-3 sm:px-6 sm:pb-4 ${
            visible ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-200`}
        >
          {iframeBlocked ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl bg-white px-6 py-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <p className="text-base font-semibold text-stone-900">
                Документ нельзя показать внутри приложения
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">
                Этот сайт запрещает встраивание. Откройте документ во внешнем
                браузере.
              </p>
              <a
                href={openUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                Открыть документ во внешнем браузере
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              key={src}
              src={src}
              title={title}
              onError={handleIframeError}
              className="min-h-0 flex-1 rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              allow="fullscreen"
            />
          )}
        </div>

        {!iframeBlocked ? (
          <div className="px-4 pb-4 sm:px-6 sm:pb-5">
            <p className="text-center text-xs leading-5 text-white/70">
              Если документ не загрузился,{' '}
              <a
                href={openUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white underline underline-offset-2 transition hover:text-white/90"
              >
                откройте его во внешнем браузере
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
