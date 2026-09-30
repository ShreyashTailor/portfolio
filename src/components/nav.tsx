"use client"

import React from "react"
import type { Route } from "next"
import Link from "next/link"

import type { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

export function Nav({
  items,
  activeId,
  activeHash,
  className,
  exactMatch = false,
}: {
  items: NavItem<Route>[]
  activeId?: string
  /** Section id highlighted by a hash link, e.g. `stack` for `/#stack`. */
  activeHash?: string | null
  className?: string
  exactMatch?: boolean
}) {
  return (
    <nav
      data-active-id={activeId}
      // Seven section links only fit beside the header actions on wide screens.
      className={cn("flex items-center gap-2.5 md:gap-4", className)}
    >
      {items.map(({ title, href }) => {
        const isActive = isNavItemActive({
          href,
          activeId,
          activeHash,
          exactMatch,
        })

        return (
          <NavItem
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
          >
            {title}
          </NavItem>
        )
      })}
    </nav>
  )
}

/** Section ids that `items` link to on the page currently being viewed. */
export function getSectionIds(items: NavItem<Route>[], pathname: string) {
  return items.flatMap(({ href }) => {
    const [path, hash] = href.split("#")
    return hash && path === pathname ? [hash] : []
  })
}

export function isNavItemActive({
  href,
  activeId,
  activeHash,
  exactMatch = false,
}: {
  href: string
  activeId?: string
  activeHash?: string | null
  exactMatch?: boolean
}) {
  const [path, hash] = href.split("#")

  if (hash) {
    return path === activeId && hash === activeHash
  }

  // While a section of the current page is in view, the link to that page
  // stays inactive so two entries are never highlighted at once.
  if (activeHash && path === activeId) {
    return false
  }

  if (exactMatch) {
    return activeId === href
  }

  return (
    activeId === href ||
    (href === "/" // Home page
      ? ["/", "/index"].includes(activeId || "")
      : Boolean(activeId?.startsWith(href)))
  )
}

export function NavItem({
  className,
  href,
  onClick,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "text-sm font-medium tracking-wide text-muted-foreground transition-[color] hover:text-foreground aria-[current=page]:text-foreground",
        className
      )}
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (typeof href === "string") {
          scrollToSection(event, href)
        }
      }}
      {...props}
    />
  )
}

/**
 * Animates a same-page hash link instead of the browser's instant jump. Links
 * to other pages are left to Next.js, which scrolls once that page loads.
 * `pushState` keeps the URL and the history entries behaving like an anchor.
 */
export function scrollToSection(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string
) {
  const [path, hash] = href.split("#")

  if (!hash || path !== window.location.pathname) return

  const element = document.getElementById(hash)
  if (!element) return

  event.preventDefault()
  window.history.pushState(null, "", href)

  element.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  })
}
