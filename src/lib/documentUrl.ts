import { assetUrl } from './assetUrl'

export function isExternalDocumentUrl(path: string | null | undefined): boolean {
  return Boolean(path && /^https?:\/\//i.test(path))
}

export function isDocumentOpenable(
  filePath: string | null | undefined,
  available?: boolean,
): boolean {
  if (!filePath) return false
  if (isExternalDocumentUrl(filePath)) return true
  return Boolean(available)
}

export function getDocumentOpenUrl(filePath: string): string {
  if (isExternalDocumentUrl(filePath)) return filePath
  return assetUrl(filePath)
}

export function getDocumentViewerSrc(filePath: string): string {
  if (!isExternalDocumentUrl(filePath)) {
    return assetUrl(filePath)
  }

  try {
    const url = new URL(filePath)
    const host = url.hostname.toLowerCase()
    const isOneDrive =
      host === '1drv.ms' ||
      host.endsWith('.1drv.ms') ||
      host === 'onedrive.live.com' ||
      host.endsWith('.onedrive.live.com') ||
      host.endsWith('.sharepoint.com')

    if (isOneDrive) {
      url.searchParams.set('embed', '1')
      if (host.endsWith('.sharepoint.com')) {
        url.searchParams.set('action', 'embedview')
      }
      return url.toString()
    }
  } catch {
    return filePath
  }

  return filePath
}
