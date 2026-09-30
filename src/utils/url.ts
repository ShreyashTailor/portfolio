export function urlToName(url: string) {
  return url.replace(/(^\w+:|^)\/\//, "")
}

/**
 * True for URLs that only resolve on the developer's machine: `localhost` and
 * its subdomains, `.local` mDNS names, and loopback addresses. Lets callers
 * keep these origins out of anything a search engine is shown.
 */
export function isLocalUrl(urlString: string) {
  let hostname: string

  try {
    hostname = new URL(urlString).hostname
  } catch {
    return false
  }

  return (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  )
}

export function addQueryParams(
  urlString: string,
  query: Record<string, string>
): string {
  try {
    const url = new URL(urlString)

    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value)
    }

    return url.toString()
  } catch {
    return urlString
  }
}
