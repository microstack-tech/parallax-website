"use client"

import { geoEqualEarth, geoPath, type GeoProjection } from "d3-geo"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { feature } from "topojson-client"
import type { FeatureCollection } from "geojson"
import type { Topology, GeometryCollection } from "topojson-specification"
import { useTranslations } from "next-intl"

type Node = {
  lat: number
  lon: number
  country: string
  countryCode: string
  region: string
}

type Props = {
  nodes: Node[]
}

// Working canvas the projection is fit into. The final viewBox is computed
// from the *actual* projected land bounds (see useMemo) so the SVG wraps the
// inhabited continents tightly with zero vertical or horizontal slack.
const FIT_W = 1000
const FIT_H = 1000

// ISO numeric code for Antarctica in world-atlas/countries-110m.json. We
// exclude it from drawing because the polar landmass would otherwise eat
// vertical space without holding any nodes.
const ANTARCTICA_ID = "010"

type Marker = {
  key: string
  x: number
  y: number
  count: number
  /** Number of individual projected nodes that were merged into this marker. */
  merged: number
  /** Deduplicated "City, Region, Country" location labels for the tooltip. */
  locations: string[]
  /** Deduplicated country names for the tooltip when cluster is merged. */
  countries: string[]
}

/**
 * Build a human-readable location label from city, region and country.
 * Deduplicates segments so "Paris, Île-de-France, France" doesn't repeat
 * if city and region happen to match.
 */
function locationLabel(node: Node, unknownLabel: string): string {
  const parts: string[] = []
  if (node.region) parts.push(node.region)
  if (node.country) parts.push(node.country)
  return parts.join(", ") || unknownLabel
}

// Grid cell size in projected (viewBox) units at zoom=1. Pins within the same
// cell merge into one marker. The cell shrinks as zoom increases so clusters
// break apart when you zoom in.
const CLUSTER_CELL = 15

type ProjectedNode = { x: number; y: number; node: Node }

function projectNodes(nodes: Node[], projection: GeoProjection): ProjectedNode[] {
  const out: ProjectedNode[] = []
  for (const n of nodes) {
    const p = projection([n.lon, n.lat])
    if (p) out.push({ x: p[0], y: p[1], node: n })
  }
  return out
}

/**
 * Cluster projected nodes into a grid whose cell size shrinks with zoom,
 * so nearby pins merge when zoomed out and separate when zoomed in.
 */
function clusterNodes(projected: ProjectedNode[], zoom: number, unknownLabel: string): Marker[] {
  const cell = CLUSTER_CELL / zoom
  const buckets = new Map<string, { sumX: number; sumY: number; count: number; locations: Set<string>; countries: Set<string> }>()

  for (const { x, y, node } of projected) {
    const col = Math.floor(x / cell)
    const row = Math.floor(y / cell)
    const key = `${col}:${row}`
    const label = locationLabel(node, unknownLabel)
    const existing = buckets.get(key)
    if (existing) {
      existing.sumX += x
      existing.sumY += y
      existing.count++
      existing.locations.add(label)
      if (node.country) existing.countries.add(node.country)
    } else {
      buckets.set(key, {
        sumX: x,
        sumY: y,
        count: 1,
        locations: new Set([label]),
        countries: node.country ? new Set([node.country]) : new Set(),
      })
    }
  }

  const out: Marker[] = []
  for (const [key, b] of buckets) {
    out.push({
      key,
      x: b.sumX / b.count,
      y: b.sumY / b.count,
      count: b.count,
      merged: b.count,
      locations: Array.from(b.locations),
      countries: Array.from(b.countries),
    })
  }
  return out
}

const MIN_ZOOM = 1
const MAX_ZOOM = 16
const ZOOM_STEP = 1.4

export default function WorldMap({ nodes }: Props) {
  const t = useTranslations("resources.networkAtlas.map")
  const [topology, setTopology] = useState<Topology | null>(null)
  const [active, setActive] = useState<Marker | null>(null)
  const [zoom, setZoom] = useState(1)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
  }, [])
  // Pan offset in viewBox units, relative to the center of the base viewBox.
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const dragRef = useRef<{ startX: number; startY: number; startPanX: number; startPanY: number } | null>(null)
  const pinchRef = useRef<{ startDist: number; startZoom: number; midX: number; midY: number } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let cancelled = false
    fetch("/maps/countries-110m.json")
      .then((r) => r.json())
      .then((t: Topology) => {
        if (!cancelled) setTopology(t)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  // Dismiss the popover when tapping anywhere outside a marker.
  useEffect(() => {
    if (!active) return
    const onDocPointer = () => setActive(null)
    document.addEventListener("pointerdown", onDocPointer)
    return () => document.removeEventListener("pointerdown", onDocPointer)
  }, [active])

  const { countriesPath, projected, baseViewBox } = useMemo(() => {
    if (!topology) {
      return {
        countriesPath: "",
        projected: [] as ProjectedNode[],
        baseViewBox: { x: 0, y: 0, w: FIT_W, h: 500 },
      }
    }

    const obj = topology.objects.countries as GeometryCollection
    const fc = feature(topology, obj) as unknown as FeatureCollection
    const inhabited: FeatureCollection = {
      type: "FeatureCollection",
      features: fc.features.filter((f) => f.id !== ANTARCTICA_ID),
    }

    const proj = geoEqualEarth().fitSize([FIT_W, FIT_H], inhabited)
    const path = geoPath(proj)
    const bounds = path.bounds(inhabited)
    const x0 = bounds[0][0]
    const y0 = bounds[0][1]
    const w = bounds[1][0] - x0
    const h = bounds[1][1] - y0

    return {
      countriesPath: path(inhabited) ?? "",
      projected: projectNodes(nodes, proj),
      baseViewBox: { x: x0, y: y0, w, h },
    }
  }, [topology, nodes])

  // Re-cluster whenever zoom changes so nearby pins merge/split dynamically.
  const unknownLabel = t("unknownLocation")
  const markers = useMemo(() => clusterNodes(projected, zoom, unknownLabel), [projected, zoom, unknownLabel])

  // Compute the zoomed + panned viewBox.
  const zoomedW = baseViewBox.w / zoom
  const zoomedH = baseViewBox.h / zoom
  const centerX = baseViewBox.x + baseViewBox.w / 2 + pan.x
  const centerY = baseViewBox.y + baseViewBox.h / 2 + pan.y
  const vbX = centerX - zoomedW / 2
  const vbY = centerY - zoomedH / 2
  const viewBox = `${vbX} ${vbY} ${zoomedW} ${zoomedH}`

  const clampPan = useCallback(
    (px: number, py: number, z: number) => {
      const maxPanX = (baseViewBox.w - baseViewBox.w / z) / 2
      const maxPanY = (baseViewBox.h - baseViewBox.h / z) / 2
      return {
        x: Math.max(-maxPanX, Math.min(maxPanX, px)),
        y: Math.max(-maxPanY, Math.min(maxPanY, py)),
      }
    },
    [baseViewBox],
  )

  const handleZoom = useCallback(
    (direction: 1 | -1) => {
      setZoom((prev) => {
        const next = direction === 1 ? prev * ZOOM_STEP : prev / ZOOM_STEP
        const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next))
        // Re-clamp pan for the new zoom level.
        setPan((p) => clampPan(p.x, p.y, clamped))
        return clamped
      })
    },
    [clampPan],
  )

  const handleReset = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  /**
   * Convert client (screen) coordinates to viewBox coordinates using
   * current state values (not the DOM, which may lag behind React state
   * during rapid interactions).
   */
  const clientToViewBox = useCallback(
    (clientX: number, clientY: number, z: number, p: { x: number; y: number }) => {
      const svg = svgRef.current
      if (!svg) return null
      const rect = svg.getBoundingClientRect()

      const vw = baseViewBox.w / z
      const vh = baseViewBox.h / z
      const cxCenter = baseViewBox.x + baseViewBox.w / 2 + p.x
      const cyCenter = baseViewBox.y + baseViewBox.h / 2 + p.y
      const vx = cxCenter - vw / 2
      const vy = cyCenter - vh / 2

      // The SVG uses preserveAspectRatio="xMidYMid meet", so the viewBox is
      // scaled uniformly to fit and centered. Compute the actual rendered area.
      const svgAspect = vw / vh
      const elemAspect = rect.width / rect.height
      let renderW: number, renderH: number, offsetX: number, offsetY: number
      if (elemAspect > svgAspect) {
        // Element is wider — letterboxed horizontally.
        renderH = rect.height
        renderW = rect.height * svgAspect
        offsetX = (rect.width - renderW) / 2
        offsetY = 0
      } else {
        // Element is taller — letterboxed vertically.
        renderW = rect.width
        renderH = rect.width / svgAspect
        offsetX = 0
        offsetY = (rect.height - renderH) / 2
      }

      const fracX = (clientX - rect.left - offsetX) / renderW
      const fracY = (clientY - rect.top - offsetY) / renderH

      return { x: vx + fracX * vw, y: vy + fracY * vh }
    },
    [baseViewBox],
  )

  // Wheel zoom — zooms toward the cursor position.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const direction: 1 | -1 = e.deltaY < 0 ? 1 : -1
      const clientX = e.clientX
      const clientY = e.clientY

      setZoom((prevZoom) => {
        const nextZoom = Math.max(
          MIN_ZOOM,
          Math.min(MAX_ZOOM, direction === 1 ? prevZoom * ZOOM_STEP : prevZoom / ZOOM_STEP),
        )
        if (nextZoom === prevZoom) return prevZoom

        setPan((prevPan) => {
          const cursor = clientToViewBox(clientX, clientY, prevZoom, prevPan)
          if (!cursor) return prevPan

          const cx = baseViewBox.x + baseViewBox.w / 2 + prevPan.x
          const cy = baseViewBox.y + baseViewBox.h / 2 + prevPan.y
          const offX = cursor.x - cx
          const offY = cursor.y - cy
          const zoomRatio = prevZoom / nextZoom
          const newCx = cursor.x - offX * zoomRatio
          const newCy = cursor.y - offY * zoomRatio

          return clampPan(
            newCx - (baseViewBox.x + baseViewBox.w / 2),
            newCy - (baseViewBox.y + baseViewBox.h / 2),
            nextZoom,
          )
        })

        return nextZoom
      })
    }
    svg.addEventListener("wheel", onWheel, { passive: false })
    return () => svg.removeEventListener("wheel", onWheel)
  }, [baseViewBox, clampPan, clientToViewBox])

  // Drag to pan (mouse & single-touch).
  const onPointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (zoom <= 1) return
      // Ignore if this is part of a multi-touch gesture.
      if (e.pointerType === "touch" && pinchRef.current) return
      const svg = svgRef.current
      if (!svg) return
      svg.setPointerCapture(e.pointerId)
      dragRef.current = { startX: e.clientX, startY: e.clientY, startPanX: pan.x, startPanY: pan.y }
    },
    [zoom, pan],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const drag = dragRef.current
      if (!drag) return
      // Cancel drag if pinch started.
      if (pinchRef.current) { dragRef.current = null; return }
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      const scale = zoomedW / rect.width
      const dx = (e.clientX - drag.startX) * scale
      const dy = (e.clientY - drag.startY) * scale
      setPan(clampPan(drag.startPanX - dx, drag.startPanY - dy, zoom))
    },
    [zoom, zoomedW, clampPan],
  )

  const onPointerUp = useCallback(() => {
    dragRef.current = null
  }, [])

  // Pinch-to-zoom on touch devices.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        dragRef.current = null
        const t0 = e.touches[0]
        const t1 = e.touches[1]
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY)
        pinchRef.current = {
          startDist: dist,
          startZoom: zoom,
          midX: (t0.clientX + t1.clientX) / 2,
          midY: (t0.clientY + t1.clientY) / 2,
        }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      const pinch = pinchRef.current
      if (!pinch || e.touches.length !== 2) return
      e.preventDefault()
      const t0 = e.touches[0]
      const t1 = e.touches[1]
      const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY)
      const scale = dist / pinch.startDist
      const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinch.startZoom * scale))
      const midClientX = pinch.midX
      const midClientY = pinch.midY

      setZoom((prevZoom) => {
        setPan((prevPan) => {
          const cursor = clientToViewBox(midClientX, midClientY, prevZoom, prevPan)
          if (!cursor) return prevPan
          const cx = baseViewBox.x + baseViewBox.w / 2 + prevPan.x
          const cy = baseViewBox.y + baseViewBox.h / 2 + prevPan.y
          const offX = cursor.x - cx
          const offY = cursor.y - cy
          const zoomRatio = prevZoom / nextZoom
          const newCx = cursor.x - offX * zoomRatio
          const newCy = cursor.y - offY * zoomRatio
          return clampPan(
            newCx - (baseViewBox.x + baseViewBox.w / 2),
            newCy - (baseViewBox.y + baseViewBox.h / 2),
            nextZoom,
          )
        })
        return nextZoom
      })
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinchRef.current = null
    }

    svg.addEventListener("touchstart", onTouchStart, { passive: false })
    svg.addEventListener("touchmove", onTouchMove, { passive: false })
    svg.addEventListener("touchend", onTouchEnd)
    svg.addEventListener("touchcancel", onTouchEnd)
    return () => {
      svg.removeEventListener("touchstart", onTouchStart)
      svg.removeEventListener("touchmove", onTouchMove)
      svg.removeEventListener("touchend", onTouchEnd)
      svg.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [zoom, baseViewBox, clampPan, clientToViewBox])

  return (
    <div className="relative w-full" style={{ touchAction: "pan-x pan-y" }}>
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={t("ariaLabel")}
        style={{ cursor: zoom > 1 ? "grab" : undefined, touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Land */}
        {countriesPath && (
          <path
            d={countriesPath}
            fill="var(--surface-elevated)"
            stroke="var(--muted-foreground)"
            strokeOpacity={0.5}
            strokeWidth={0.6}
            strokeLinejoin="round"
          />
        )}

        {/* Markers */}
        {markers.map((m) => {
          const baseR = m.count > 1
            ? Math.min((isTouch ? 5 : 3.5) + Math.log2(m.count) * (isTouch ? 2 : 1.5), isTouch ? 12 : 9)
            : isTouch ? 5 : 3.5
          const r = baseR / zoom
          const isActive = active?.key === m.key
          return (
            <g
              key={m.key}
              onMouseEnter={() => setActive(m)}
              onMouseLeave={() => setActive(null)}
              onPointerDown={(e) => {
                e.stopPropagation()
                setActive(isActive ? null : m)
              }}
              style={{ cursor: "pointer" }}
            >
              <circle cx={m.x} cy={m.y} r={(isTouch ? 18 : 14) / zoom} fill="transparent" />
              <circle cx={m.x} cy={m.y} r={r + (isTouch ? 5 : 4) / zoom} fill="var(--gold)" opacity={0.18} />
              <circle
                cx={m.x}
                cy={m.y}
                r={r}
                fill="var(--gold)"
                stroke="var(--background)"
                strokeWidth={0.9 / zoom}
              />
            </g>
          )
        })}
      </svg>

      {/* Zoom controls */}
      <div className="absolute top-2 right-2 flex flex-col gap-1">
        <button
          onClick={() => handleZoom(1)}
          disabled={zoom >= MAX_ZOOM}
          className="w-7 h-7 flex items-center justify-center rounded border border-border bg-background/90 backdrop-blur-sm text-foreground text-sm font-mono hover:bg-surface-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label={t("zoomIn")}
        >
          +
        </button>
        <button
          onClick={() => handleZoom(-1)}
          disabled={zoom <= MIN_ZOOM}
          className="w-7 h-7 flex items-center justify-center rounded border border-border bg-background/90 backdrop-blur-sm text-foreground text-sm font-mono hover:bg-surface-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label={t("zoomOut")}
        >
          &minus;
        </button>
        {zoom > 1 && (
          <button
            onClick={handleReset}
            className="w-7 h-7 flex items-center justify-center rounded border border-border bg-background/90 backdrop-blur-sm text-muted-foreground text-[10px] font-mono hover:bg-surface-elevated transition-colors"
            aria-label={t("resetZoom")}
          >
            1:1
          </button>
        )}
      </div>

      {active && baseViewBox.w > 0 && baseViewBox.h > 0 && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded border border-border bg-background/95 backdrop-blur-sm px-2.5 py-1.5 text-xs shadow-sm whitespace-nowrap"
          style={{
            left: `${((active.x - vbX) / zoomedW) * 100}%`,
            top: `${((active.y - vbY) / zoomedH) * 100}%`,
          }}
        >
          <div className="font-medium text-foreground">
            {active.count} {active.count === 1 ? t("nodeSingular") : t("nodePlural")}
          </div>
          {active.locations.length > 1 ? (
            active.countries.length > 0 && (
              <div className="text-muted-foreground">{active.countries.join(", ")}</div>
            )
          ) : (
            active.locations.length === 1 && (
              <div className="text-muted-foreground">{active.locations[0]}</div>
            )
          )}
        </div>
      )}
    </div>
  )
}
