import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  x: {
    title: "X",
    handle: "@shreyash_1678",
    href: "https://x.com/shreyash_1678",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "ShreyashTailor",
    href: "https://github.com/ShreyashTailor",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "tailorshreyash",
    href: "https://linkedin.com/in/tailorshreyash",
    sameAs: true,
  },
  // dailydotdev: {
  //   title: "daily.dev",
  //   handle: "@ncdai",
  //   href: "https://app.daily.dev/ncdai",
  //   sameAs: true,
  // },
  discord: {
    title: "Discord",
    handle: "shreyash0467",
    href: "https://discord.com/users/shreyash0467",
  },
  youtube: {
    title: "YouTube",
    handle: "@s2islivee",
    href: "https://www.youtube.com/@s2islivee",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
