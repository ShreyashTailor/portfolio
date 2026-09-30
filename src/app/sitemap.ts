import type { MetadataRoute } from "next"

import { SITE_URL } from "@/config/site"

export const revalidate = false
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
    },
  ]
}
