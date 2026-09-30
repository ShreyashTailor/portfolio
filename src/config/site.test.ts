import { isLocalUrl } from "@/utils/url"
import { afterEach, describe, expect, it, vi } from "vitest"

const APP_URL = "NEXT_PUBLIC_APP_URL"

async function loadSiteUrl() {
  vi.resetModules()

  const { SITE_URL } = await import("@/config/site")

  return SITE_URL
}

describe("SITE_URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it("falls back to the production origin when the configured url is local", async () => {
    vi.stubEnv(APP_URL, "https://ncdai.localhost")

    expect(await loadSiteUrl()).toBe("https://shreyash.blear.in")
  })

  it("falls back to the production origin when the variable is unset", async () => {
    vi.stubEnv(APP_URL, "")

    expect(await loadSiteUrl()).toBe("https://shreyash.blear.in")
  })

  it("keeps a configured public origin", async () => {
    vi.stubEnv(APP_URL, "https://shreyash.example.com")

    expect(await loadSiteUrl()).toBe("https://shreyash.example.com")
  })

  it("never resolves to a local origin", async () => {
    vi.stubEnv(APP_URL, "https://ncdai.localhost")

    expect(isLocalUrl(await loadSiteUrl())).toBe(false)
  })
})
