import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import {
  getDocumentOpenUrl,
  getDocumentViewerSrc,
  isDocumentOpenable,
} from '../lib/documentUrl'
import { DocumentViewerModal } from './DocumentViewerModal'

interface DocumentLinkCardProps {
  title: string
  icon: string
  description?: string
  url?: string | null
  /** @deprecated use url */
  filePath?: string | null
  available?: boolean
}

export function DocumentLinkCard({
  title,
  icon,
  description,
  url,
  filePath,
  available,
}: DocumentLinkCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const resolvedUrl = url ?? filePath ?? null
  const canOpen = isDocumentOpenable(resolvedUrl, available)

  return (
    <div className="h-full">
      <article className="flex h-full flex-col gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-6 text-stone-900">{title}</h3>
            {description ? (
              <p className="mt-1 text-sm leading-5 text-stone-500">
                {description}
              </p>
            ) : null}
            {!canOpen && (
              <p className="mt-1 text-xs text-stone-400">
                Документ пока не добавлен
              </p>
            )}
          </div>
        </div>

        {canOpen && resolvedUrl ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            Открыть
            <ExternalLink size={15} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="mt-auto inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-400"
          >
            Открыть
            <ExternalLink size={15} aria-hidden="true" />
          </button>
        )}
      </article>

      {canOpen && resolvedUrl && (
        <DocumentViewerModal
          isOpen={isOpen}
          title={title}
          src={getDocumentViewerSrc(resolvedUrl)}
          openUrl={getDocumentOpenUrl(resolvedUrl)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
