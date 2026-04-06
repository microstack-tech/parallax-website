"use client"

import { geoEqualEarth, geoPath, type GeoProjection } from "d3-geo"
import { useEffect, useMemo, useState } from "react"
import { feature } from "topojson-client"
import type { FeatureCollection } from "geojson"
import type { Topology, GeometryCollection } from "topojson-specification"

type Node = {
  id: string
  lat: number
  lon: number
  country: string
  countryCode: string
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
  countries: string[]
}

/**
 * Round lat/lon to a 1° grid so visually-overlapping nodes (e.g. multiple
 * machines in the same datacenter) collapse into a single marker with a count.
 */
function clusterNodes(
  nodes: Node[],
  projection: GeoProjection,
): Marker[] {
  const buckets = new Map<string, { lat: number; lon: number; count: number; countries: Set<string> }>()
  for (const n of nodes) {
    const key = `${Math.round(n.lat)}:${Math.round(n.lon)}`
    const existing = buckets.get(key)
    if (existing) {
      existing.count++
      if (n.country) existing.countries.add(n.country)
    } else {
      buckets.set(key, {
        lat: n.lat,
        lon: n.lon,
        count: 1,
        countries: n.country ? new Set([n.country]) : new Set(),
      })
    }
  }

  const out: Marker[] = []
  for (const [key, b] of buckets) {
    const projected = projection([b.lon, b.lat])
    if (!projected) continue
    out.push({
      key,
      x: projected[0],
      y: projected[1],
      count: b.count,
      countries: Array.from(b.countries),
    })
  }
  return out
}

export default function WorldMap({ nodes }: Props) {
  const [topology, setTopology] = useState<Topology | null>(null)
  const [active, setActive] = useState<Marker | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch("/maps/countries-110m.json")
      .then((r) => r.json())
      .then((t: Topology) => {
        if (!cancelled) setTopology(t)
      })
      .catch(() => {
        // Map data is non-critical: if it fails, we render markers on a blank
        // canvas rather than failing the page.
      })
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

  const { countriesPath, markers, viewBox, width, height } = useMemo(() => {
    if (!topology) {
      return {
        countriesPath: "",
        markers: [] as Marker[],
        viewBox: `0 0 ${FIT_W} 500`,
        width: FIT_W,
        height: 500,
      }
    }

    const obj = topology.objects.countries as GeometryCollection
    const fc = feature(topology, obj) as unknown as FeatureCollection
    const inhabited: FeatureCollection = {
      type: "FeatureCollection",
      features: fc.features.filter((f) => f.id !== ANTARCTICA_ID),
    }

    // Fit the projection to the inhabited landmass and use the projected
    // bounds as the viewBox, so the SVG wraps the continents snugly with
    // zero internal slack and no clipping.
    const proj = geoEqualEarth().fitSize([FIT_W, FIT_H], inhabited)
    const path = geoPath(proj)
    const bounds = path.bounds(inhabited) // [[x0,y0],[x1,y1]]
    const x0 = bounds[0][0]
    const y0 = bounds[0][1]
    const w = bounds[1][0] - x0
    const h = bounds[1][1] - y0

    return {
      countriesPath: path(inhabited) ?? "",
      markers: clusterNodes(nodes, proj),
      viewBox: `${x0} ${y0} ${w} ${h}`,
      width: w,
      height: h,
    }
  }, [topology, nodes])

  return (
    <div className="relative w-full">
      <svg
        viewBox={viewBox}
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="World map of reachable Parallax nodes"
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

        {/* Markers. Marker geometry is sized in viewBox units so it scales
            with the SVG; the touch hit-target is intentionally larger than
            the visible dot for usable tapping on mobile. */}
        {markers.map((m) => {
          const r = m.count > 1 ? Math.min(3.5 + Math.log2(m.count) * 1.5, 9) : 3.5
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
              {/* Invisible touch target — generous radius for mobile taps. */}
              <circle cx={m.x} cy={m.y} r={14} fill="transparent" />
              <circle cx={m.x} cy={m.y} r={r + 4} fill="var(--gold)" opacity={0.18} />
              <circle
                cx={m.x}
                cy={m.y}
                r={r}
                fill="var(--gold)"
                stroke="var(--background)"
                strokeWidth={0.9}
              />
            </g>
          )
        })}
      </svg>

      {active && width > 0 && height > 0 && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded border border-border bg-background/95 backdrop-blur-sm px-2.5 py-1.5 text-xs shadow-sm whitespace-nowrap"
          style={{
            // viewBox uses [x0..x0+width, y0..y0+height]; convert the marker's
            // viewBox-space position to a percentage of the rendered SVG.
            left: `${((active.x - parseFloat(viewBox.split(" ")[0])) / width) * 100}%`,
            top: `${((active.y - parseFloat(viewBox.split(" ")[1])) / height) * 100}%`,
          }}
        >
          <div className="font-medium text-foreground">
            {active.count} {active.count === 1 ? "node" : "nodes"}
          </div>
          {active.countries.length > 0 && (
            <div className="text-muted-foreground">{active.countries.join(", ")}</div>
          )}
        </div>
      )}
    </div>
  )
}
