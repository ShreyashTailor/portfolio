/**
 * Blocky letterforms for the wordmark, drawn on a 32-unit grid to match the
 * mark in `shreyash-mark.tsx`. Every glyph is 5 columns wide and 8 rows tall,
 * so ascenders (h) start at row 0 and x-height letters (a, e, r, s, y) start
 * at row 2, leaving rows 0-1 as ascender space.
 */
const GLYPHS: Record<string, string[]> = {
  a: [".....", ".....", ".####", "#...#", "#...#", "#...#", "#..##", ".##.#"],
  e: [".....", ".....", ".###.", "#...#", "#####", "#....", "#...#", ".###."],
  h: ["#....", "#....", "####.", "#...#", "#...#", "#...#", "#...#", "#...#"],
  r: [".....", ".....", "####.", "#...#", "#....", "#....", "#....", "#...."],
  S: [".###.", "#...#", "#....", ".###.", "....#", "....#", "#...#", ".###."],
  s: [".....", ".....", ".###.", "#...#", ".###.", "....#", "#...#", ".###."],
  y: [".....", ".....", "#...#", "#...#", ".####", "....#", "....#", ".###."],
}

const CELL = 32
const PADDING = 1
const GLYPH_COLUMNS = 5
const GLYPH_ROWS = 8
const COLUMN_GAP = 1

const glyphs = "Shreyash"

const columnCount =
  glyphs.length * GLYPH_COLUMNS + (glyphs.length - 1) * COLUMN_GAP

const width = columnCount * CELL + PADDING * 2
const height = GLYPH_ROWS * CELL + PADDING * 2

/** Cells are merged into one rect per horizontal run, keeping the path short. */
function buildPath() {
  const rects: string[] = []

  for (const [index, glyph] of [...glyphs].entries()) {
    const bitmap = GLYPHS[glyph]
    if (!bitmap) continue

    const glyphOffset = index * (GLYPH_COLUMNS + COLUMN_GAP)

    for (const [row, line] of bitmap.entries()) {
      let runStart = -1

      for (let column = 0; column <= GLYPH_COLUMNS; column++) {
        const isFilled = column < GLYPH_COLUMNS && line[column] === "#"

        if (isFilled && runStart < 0) {
          runStart = column
        } else if (!isFilled && runStart >= 0) {
          const x = PADDING + (glyphOffset + runStart) * CELL
          const y = PADDING + row * CELL
          const runWidth = (column - runStart) * CELL

          rects.push(`M${x} ${y}H${x + runWidth}V${y + CELL}H${x}Z`)
          runStart = -1
        }
      }
    }
  }

  return rects.join("")
}

export const SHREYASH_WORDMARK = {
  path: buildPath(),
  viewBox: `0 0 ${width} ${height}`,
  width,
  height,
}

export function ShreyashWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={SHREYASH_WORDMARK.viewBox}
      aria-hidden
      {...props}
    >
      <path fill="currentColor" d={SHREYASH_WORDMARK.path} />
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="${SHREYASH_WORDMARK.viewBox}"><path fill="currentColor" d="${SHREYASH_WORDMARK.path}"/></svg>`
}
