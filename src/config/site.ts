import type { Route } from "next"
import { isLocalUrl } from "@/utils/url"

import type { NavItem } from "@/types/nav"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

const description =
  "Shreyash Tailor is a Next.js and shadcn/ui specialist building scalable, production-ready web applications with a focus on design engineering."

/**
 * The origin the site is published on. Used as the fallback when
 * `NEXT_PUBLIC_APP_URL` is unset, and whenever that variable holds a local
 * origin that would be meaningless to anyone but the developer.
 */
const PRODUCTION_URL = "https://shreyash.blear.in"

const configuredUrl = process.env.NEXT_PUBLIC_APP_URL || PRODUCTION_URL

export const SITE_INFO = {
  name: USER.displayName,
  // Deliberately the configured value, dev origin included, so locally rendered
  // absolute URLs match the origin the dev server is actually served from.
  url: configuredUrl,
  // Rendered on demand by the `/og/simple` route (1200x630).
  ogImage: `/og/simple?title=${encodeURIComponent(USER.displayName)}&description=${encodeURIComponent(description)}`,
  description,
  keywords: USER.keywords,
}

/**
 * Origin for anything a crawler reads: the sitemap entry and the sitemap
 * pointer in robots.txt. Never a local origin, so running the build or the dev
 * server on a machine-only host cannot leak `ncdai.localhost` into what search
 * engines are shown. Preview deployments should still set
 * `NEXT_PUBLIC_APP_URL` to the canonical domain so canonical URLs stay right.
 */
export const SITE_URL = isLocalUrl(configuredUrl)
  ? PRODUCTION_URL
  : configuredUrl

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/ShreyashTailor/portfolio/blob/main/LICENSE",
}

/**
 * Pinned to the site's DMCA protection status page rather than read from
 * `NEXT_PUBLIC_DMCA_URL`, so a leftover generic value in the environment
 * cannot point the footer badge at the wrong badge.
 */
export const DMCA_URL =
  "https://www.dmca.com/Protection/Status.aspx?ID=cb6003cf-ee5e-4b7a-908e-160caacae711&refurl=https://shreyash.blear.in"

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

/**
 * Home-page sections, in the order they appear. The hash links highlight the
 * section currently in view; see `useActiveSection`.
 */
export const MAIN_NAV: NavItem<Route>[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/#hello",
  },
  {
    title: "Stack",
    href: "/#stack",
  },
  {
    title: "Experience",
    href: "/#experience",
  },
  {
    title: "Education",
    href: "/#education",
  },
  {
    title: "Projects",
    href: "/#projects",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
]

export const MOBILE_NAV: NavItem<Route>[] = MAIN_NAV

export const X_HANDLE = SOCIAL.x.handle
export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = "ShreyashTailor/portfolio"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/ShreyashTailor/portfolio"

export const SPONSORSHIP_URL = "https://github.com/sponsors/ShreyashTailor"

export const UTM_PARAMS = {
  utm_source: "shreyash.blear.in",
}
