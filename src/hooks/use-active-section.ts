import { useEffect, useState } from "react"

/**
 * Id of the section currently scrolled to, for hash navigation. A section
 * counts as current once its top crosses its own `scroll-margin-top`, which is
 * where an anchor jump lands it, so the highlight agrees with the link that was
 * clicked. Returns `null` above the first section.
 */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = ids.join(",")

  useEffect(() => {
    const sectionIds = key ? key.split(",") : []

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    // Static per section, so read them once rather than on every scroll frame.
    const scrollMargins = elements.map(
      (element) => parseFloat(getComputedStyle(element).scrollMarginTop) || 0
    )

    // An anchor jump lands a hair past the scroll margin, so allow a pixel of
    // slack or the section that was just clicked would never light up.
    const CROSSED_TOLERANCE = 1

    let frame = 0

    const update = () => {
      frame = 0

      let current: string | null = null
      const lastElement = elements[elements.length - 1]

      const atPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1

      if (lastElement && atPageEnd) {
        // The last section can be too short to ever reach the anchor line.
        current = lastElement.id
      } else {
        for (let index = 0; index < elements.length; index++) {
          const isCrossed =
            elements[index].getBoundingClientRect().top -
              scrollMargins[index] <=
            CROSSED_TOLERANCE

          if (isCrossed) {
            current = elements[index].id
          }
        }
      }

      setActiveId(current)
    }

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(update)
      }
    }

    if (elements.length === 0) {
      // Deferred so the effect doesn't set state during render-on-mount.
      scheduleUpdate()
      return
    }

    update()

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    window.addEventListener("hashchange", scheduleUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      window.removeEventListener("hashchange", scheduleUpdate)
    }
  }, [key])

  return activeId
}
