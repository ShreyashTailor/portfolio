"use client"

import type { Route } from "next"
import { usePathname } from "next/navigation"

import type { NavItem } from "@/types/nav"
import { useActiveSection } from "@/hooks/use-active-section"
import { getSectionIds, Nav } from "@/components/nav"

export function NavDesktop({ items }: { items: NavItem<Route>[] }) {
  const pathname = usePathname()
  const activeHash = useActiveSection(getSectionIds(items, pathname))

  return (
    <Nav
      className="max-sm:hidden"
      items={items}
      activeId={pathname}
      activeHash={activeHash}
    />
  )
}
