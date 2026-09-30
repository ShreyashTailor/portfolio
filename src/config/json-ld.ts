import type { Person } from "schema-dts"

import { SITE_INFO } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

/**
 * Stable @id anchors so Google can merge JSON-LD nodes across separate
 * <script> blocks (and pages) into a single entity in the Knowledge Graph.
 * The "#fragment" keeps each node id distinct from the page URL itself.
 */
export const JSON_LD_ID = {
  website: `${SITE_INFO.url}/#website`,
  person: `${SITE_INFO.url}/#person`,
} as const

export const personJsonLd: Person = {
  "@type": "Person",
  "@id": JSON_LD_ID.person,
  name: USER.displayName,
  alternateName: [USER.username],
  identifier: USER.username,
  // Absolute, since the avatar is served locally and JSON-LD is not resolved
  // against `metadataBase` like Next metadata is.
  image: absoluteUrl(USER.avatar),
  url: SITE_INFO.url,
  jobTitle: USER.jobTitle,
  worksFor: USER.jobs.map((job) => ({
    "@type": "Organization",
    name: job.company,
    url: job.website,
  })),
  // Public profiles opt in via their `sameAs` flag (Knowledge Graph).
  sameAs: SOCIAL_LINKS.filter((link) => link.sameAs).map((link) => link.href),
}
