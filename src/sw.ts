/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core'
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

declare let self: ServiceWorkerGlobalScope

const base = import.meta.env.BASE_URL

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)
void self.skipWaiting()
clientsClaim()

// SPA routes → precached index.html (works fully offline)
registerRoute(
  new NavigationRoute(createHandlerBoundToURL(`${base}index.html`), {
    denylist: [new RegExp(`^${base}api/`)],
  }),
)

registerRoute(
  ({ request, url }) =>
    request.destination === 'image' ||
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.pathname),
  new CacheFirst({
    cacheName: 'georgia-images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 400,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
)

registerRoute(
  ({ url }) => url.pathname.startsWith(`${base}documents/`),
  new CacheFirst({
    cacheName: 'georgia-documents',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
)

registerRoute(
  ({ request, url }) =>
    request.destination === 'font' ||
    /\.(?:woff2?|ttf|otf)$/i.test(url.pathname),
  new CacheFirst({
    cacheName: 'georgia-fonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
)

registerRoute(
  ({ url }) => /\.json$/i.test(url.pathname),
  new CacheFirst({
    cacheName: 'georgia-json',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
)
