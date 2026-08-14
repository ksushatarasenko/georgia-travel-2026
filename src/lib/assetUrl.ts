const BASE = import.meta.env.BASE_URL

/** Prefix a public asset path with the Vite base (GitHub Pages subdirectory). */
export function assetUrl(path: string): string {
  if (!path) return path
  if (/^(?:https?:|data:|blob:)/i.test(path)) return path
  if (BASE !== '/' && path.startsWith(BASE)) return path
  if (path.startsWith('/')) return `${BASE}${path.slice(1)}`
  return `${BASE}${path}`
}

export function withAssetBase<T>(value: T): T {
  if (typeof value === 'string') {
    if (
      value.startsWith('/images/') ||
      value.startsWith('/icons/') ||
      value.startsWith('/documents/') ||
      value.startsWith('/assets/')
    ) {
      return assetUrl(value) as T
    }
    return value
  }

  if (Array.isArray(value)) {
    return value.map((item) => withAssetBase(item)) as T
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, withAssetBase(nested)]),
    ) as T
  }

  return value
}
