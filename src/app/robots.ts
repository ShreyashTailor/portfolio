import type { MetadataRoute } from "next"

import { SITE_URL } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Registry previews and the vCard download are not indexable content.
        // `/og` is intentionally left crawlable so OG image cards can be fetched.
        disallow: ["/preview/", "/vcard"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
