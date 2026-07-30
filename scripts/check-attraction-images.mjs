#!/usr/bin/env node
/**
 * Ensure each attraction uses unique photos:
 * - 6 gallery + 6 highlights (min 12)
 * - no path reuse across gallery / highlights / cover image within one attraction
 * - referenced files exist on disk
 * - no duplicate file content (MD5) within one attraction
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const events = JSON.parse(readFileSync(join(root, 'src/data/tripEvents.json'), 'utf8'))
const publicDir = join(root, 'public')

let failed = false

function md5(filePath) {
  return createHash('md5').update(readFileSync(filePath)).digest('hex')
}

function toPublicPath(src) {
  if (!src || !src.startsWith('/')) return null
  return join(publicDir, src.slice(1))
}

for (const event of events) {
  const details = event.attractionDetails
  if (!details) continue

  const gallery = details.gallery ?? []
  const highlights = details.highlights ?? []
  const paths = []

  if (event.image) paths.push({ role: 'cover', src: event.image })
  for (const img of gallery) paths.push({ role: 'gallery', src: img.src })
  for (const item of highlights) paths.push({ role: 'highlight', src: item.image })

  console.log(`\n${event.id}`)
  if (gallery.length < 6) {
    console.error(`  ✗ gallery has ${gallery.length} images (need ≥6)`)
    failed = true
  }
  if (highlights.length < 6) {
    console.error(`  ✗ highlights has ${highlights.length} images (need ≥6)`)
    failed = true
  }

  const pathSet = new Set()
  const hashMap = new Map()

  for (const { role, src } of paths) {
    if (pathSet.has(src)) {
      const coverSharesGallery01 =
        gallery[0]?.src === src && (role === 'cover' || role === 'gallery')
      if (!coverSharesGallery01) {
        console.error(`  ✗ path reused: ${src} (${role})`)
        failed = true
      }
    }
    pathSet.add(src)

    const filePath = toPublicPath(src)
    if (!filePath || !existsSync(filePath)) {
      console.error(`  ✗ missing file: ${src}`)
      failed = true
      continue
    }

    const hash = md5(filePath)
    if (hashMap.has(hash)) {
      const prev = hashMap.get(hash)
      const coverOk =
        (role === 'cover' && prev.role === 'gallery' && gallery[0]?.src === src) ||
        (prev.role === 'cover' && role === 'gallery' && gallery[0]?.src === src)
      if (!coverOk) {
        console.error(`  ✗ duplicate content: ${src} == ${prev.src}`)
        failed = true
      }
    } else {
      hashMap.set(hash, { role, src })
    }
  }

  const galleryPaths = new Set(gallery.map((g) => g.src))
  for (const h of highlights) {
    if (galleryPaths.has(h.image)) {
      console.error(`  ✗ highlight reuses gallery path: ${h.image}`)
      failed = true
    }
  }

  const blockPaths = [...gallery.map((g) => g.src), ...highlights.map((h) => h.image)]
  const blockHashes = new Set(
    blockPaths
      .map(toPublicPath)
      .filter((fp) => fp && existsSync(fp))
      .map(md5),
  )
  if (blockHashes.size < 12) {
    console.error(`  ✗ only ${blockHashes.size} unique gallery+highlight photos (need 12)`)
    failed = true
  } else {
    console.log(`  ✓ ${blockHashes.size} unique photos (gallery ${gallery.length} + highlights ${highlights.length})`)
  }
}

if (failed) {
  console.error('\nAttraction image check FAILED')
  process.exit(1)
}
console.log('\nAttraction image check passed')
