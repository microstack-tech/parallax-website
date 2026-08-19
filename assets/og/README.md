# Open Graph card backgrounds

Still frames of the hero's black hole (`components/black-hole.tsx`), used by
`app/og.png/route.tsx`. Captured from the running site with headless Chromium
by reading the WebGL canvas (`canvas.toDataURL()` inside a rAF callback, so the
drawing buffer is still valid), at a 1920×1080 window — the canvas itself is
text-free; the hero's tagline, vignette, and grain are DOM overlays.

- `blackhole.jpg` — hole centered; background of the site-wide brand card.
  Crop: `magick <capture>.png -crop 1524x800+218+112 +repage -resize 1200x630! -quality 88 -strip blackhole.jpg`
- `blackhole-right.jpg` — hole in the right two-thirds, dark space on the left
  for the page title; background of the per-page title cards.
  Crop: `magick <capture>.png -crop 1400x735+47+144 +repage -resize 1200x630! -quality 88 -strip blackhole-right.jpg`

The crop offsets assume the hole's glow is centered near (980, 512) in the
1920×993 capture; re-derive them if the hero's camera or framing changes.
