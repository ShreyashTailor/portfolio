"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

/**
 * The "ST" monogram is authored as a grid of cells and projected into an
 * isometric slab, so the letters can be re-drawn without touching any maths:
 * each filled cell contributes a hatched top face, the side faces that face the
 * viewer, and the outline edges around them.
 *
 * Lifted from the isometric mark on chanhdai.com (MIT), which uses the same
 * technique.
 */
const GLYPH = [
  // S            T
  "XXX.XXXX",
  "X....XX.",
  ".XX..XX.",
  "XXX..XX.",
]

const CELL = 64
const HALF_WIDTH = CELL * Math.cos(Math.PI / 6)
const HALF_HEIGHT = CELL / 2

/** Thickness of the slab, and how thin it gets while pressed. */
const SLAB_HEIGHT = 32
const PRESSED_SLAB_HEIGHT = SLAB_HEIGHT / 2

const VIEW_BOX = "-222 -32 666 384"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

export function ShreyashMarkIsometric() {
  const id = useId()
  const ids = {
    topFaces: `shreyash-top-faces-${id}`,
    outline: `shreyash-outline-${id}`,
    hatch: `shreyash-hatch-${id}`,
    light: `shreyash-light-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox={VIEW_BOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.hatch}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        {/* y, not a transform string: Motion runs those on WAAPI, which the
            <use> copies don't follow, so the hatch drifts off the outline. */}
        <motion.g
          id={ids.topFaces}
          variants={{
            normal: {
              y: 0,
            },
            pressed: {
              y: SLAB_HEIGHT - PRESSED_SLAB_HEIGHT,
            },
          }}
          transition={transition}
        >
          <path d={TOP_FACES} />
        </motion.g>

        <motion.path
          id={ids.outline}
          variants={{
            normal: {
              d: OUTLINE,
            },
            pressed: {
              d: PRESSED_OUTLINE,
            },
          }}
          transition={transition}
        />

        <motion.radialGradient
          id={ids.light}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d={GUIDE_LINES} />
      </g>

      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        <motion.path
          variants={{
            normal: {
              d: SIDE_FACES,
            },
            pressed: {
              d: PRESSED_SIDE_FACES,
            },
          }}
          transition={transition}
        />
      </g>

      <use href={`#${ids.topFaces}`} className="fill-background" />
      <use href={`#${ids.topFaces}`} fill={`url(#${ids.hatch})`} />

      <use href={`#${ids.outline}`} stroke="var(--stroke)" />
      <use href={`#${ids.outline}`} stroke={`url(#${ids.light})`} />
    </motion.svg>
  )
}

function isFilled(col: number, row: number) {
  return GLYPH[row]?.[col] === "X"
}

/** Isometric projection of a grid corner, `z` above the ground plane. */
function point(col: number, row: number, z: number) {
  return `${round((col - row) * HALF_WIDTH)} ${round(
    (col + row) * HALF_HEIGHT - z
  )}`
}

function round(value: number) {
  return Math.round(value * 100) / 100
}

/** One quad per filled cell: coplanar, so they merge visually when filled. */
function getTopFaces() {
  const faces: string[] = []

  for (let row = 0; row < GLYPH.length; row++) {
    for (let col = 0; col < GLYPH[row].length; col++) {
      if (!isFilled(col, row)) continue

      faces.push(
        `M${point(col, row, SLAB_HEIGHT)}` +
          `L${point(col + 1, row, SLAB_HEIGHT)}` +
          `L${point(col + 1, row + 1, SLAB_HEIGHT)}` +
          `L${point(col, row + 1, SLAB_HEIGHT)}Z`
      )
    }
  }

  return faces.join("")
}

/**
 * Side faces that face the viewer — the ones whose neighbour along +col or
 * +row is empty. Back-facing sides are hidden by the slab itself.
 */
function getSideFaces(slab: number) {
  const faces: string[] = []

  for (let row = 0; row < GLYPH.length; row++) {
    for (let col = 0; col < GLYPH[row].length; col++) {
      if (!isFilled(col, row)) continue

      if (!isFilled(col + 1, row)) {
        faces.push(
          `M${point(col + 1, row, slab)}` +
            `L${point(col + 1, row + 1, slab)}` +
            `L${point(col + 1, row + 1, 0)}` +
            `L${point(col + 1, row, 0)}Z`
        )
      }

      if (!isFilled(col, row + 1)) {
        faces.push(
          `M${point(col, row + 1, slab)}` +
            `L${point(col + 1, row + 1, slab)}` +
            `L${point(col + 1, row + 1, 0)}` +
            `L${point(col, row + 1, 0)}Z`
        )
      }
    }
  }

  return faces.join("")
}

/**
 * Outline of the slab: every exposed top edge, the bottom edge of each front
 * face, and the verticals that join them. Rows run back to front, which is also
 * the order the faces need to be painted in.
 */
function getOutline(slab: number) {
  const segments: string[] = []

  const edge = (from: string, to: string) => segments.push(`M${from}L${to}`)

  for (let row = 0; row < GLYPH.length; row++) {
    for (let col = 0; col < GLYPH[row].length; col++) {
      if (!isFilled(col, row)) continue

      if (!isFilled(col - 1, row)) {
        edge(point(col, row, slab), point(col, row + 1, slab))
      }

      if (!isFilled(col, row - 1)) {
        edge(point(col, row, slab), point(col + 1, row, slab))
      }

      if (!isFilled(col + 1, row)) {
        edge(point(col + 1, row, slab), point(col + 1, row + 1, slab))
        edge(point(col + 1, row, 0), point(col + 1, row + 1, 0))
        edge(point(col + 1, row, slab), point(col + 1, row, 0))
        edge(point(col + 1, row + 1, slab), point(col + 1, row + 1, 0))
      }

      if (!isFilled(col, row + 1)) {
        edge(point(col, row + 1, slab), point(col + 1, row + 1, slab))
        edge(point(col, row + 1, 0), point(col + 1, row + 1, 0))
        edge(point(col, row + 1, slab), point(col, row + 1, 0))
        edge(point(col + 1, row + 1, slab), point(col + 1, row + 1, 0))
      }
    }
  }

  return segments.join("")
}

/** Dashed isometric guides that run well past the mark, as decoration. */
function getGuideLines() {
  const far = 16
  const lines: string[] = []

  for (const row of [-1.5, 3]) {
    lines.push(`M${point(-far, row, 0)}L${point(far, row, 0)}`)
  }

  lines.push(`M${point(-1.5, -far, 0)}L${point(-1.5, far, 0)}`)

  return lines.join("")
}

const TOP_FACES = getTopFaces()
const SIDE_FACES = getSideFaces(SLAB_HEIGHT)
const PRESSED_SIDE_FACES = getSideFaces(PRESSED_SLAB_HEIGHT)
const OUTLINE = getOutline(SLAB_HEIGHT)
const PRESSED_OUTLINE = getOutline(PRESSED_SLAB_HEIGHT)
const GUIDE_LINES = getGuideLines()
