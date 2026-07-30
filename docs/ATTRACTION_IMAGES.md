# Attraction images standard

Each attraction page must use **at least 12 unique real photographs**:

- `public/images/<slug>/gallery/` — 6 photos for the main gallery
- `public/images/<slug>/highlights/` — 6 **different** photos for «Что вас ждёт»

## Rules

1. No photo may be reused inside one attraction (gallery ↔ highlights ↔ lightbox sets).
2. Lightbox for the main gallery scrolls only gallery images.
3. Lightbox for «Что вас ждёт» scrolls only highlight images.
4. Prefer finding more high-quality watermark-free photos over duplicating.
5. The next attraction must use its own photo set — never reuse the previous location’s files.
6. Cover `event.image` may equal `gallery/gallery-01.jpg` only.

## Check

```bash
npm run check:images
```
