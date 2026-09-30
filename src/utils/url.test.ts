import { addQueryParams, isLocalUrl, urlToName } from "@/utils/url"
import { describe, expect, it } from "vitest"

describe("urlToName", () => {
  it("strips https:// scheme", () => {
    expect(urlToName("https://chanhdai.com")).toBe("chanhdai.com")
  })

  it("strips http:// scheme and keeps path", () => {
    expect(urlToName("http://x.com/y")).toBe("x.com/y")
  })

  it("strips protocol-relative //", () => {
    expect(urlToName("//cdn.x.com")).toBe("cdn.x.com")
  })

  it("leaves a bare host unchanged", () => {
    expect(urlToName("chanhdai.com")).toBe("chanhdai.com")
  })
})

describe("addQueryParams", () => {
  it("adds a query param to a valid url", () => {
    expect(addQueryParams("https://x.com", { a: "1" })).toContain("a=1")
  })

  it("returns the original string when given an invalid url", () => {
    expect(addQueryParams("not a url", { a: "1" })).toBe("not a url")
  })
})

describe("isLocalUrl", () => {
  it("matches localhost and its subdomains", () => {
    expect(isLocalUrl("http://localhost:3000")).toBe(true)
    expect(isLocalUrl("https://ncdai.localhost")).toBe(true)
  })

  it("matches .local names and loopback addresses", () => {
    expect(isLocalUrl("https://ncdai.local")).toBe(true)
    expect(isLocalUrl("http://127.0.0.1:3000")).toBe(true)
    expect(isLocalUrl("http://[::1]:3000")).toBe(true)
  })

  it("does not match a public origin that merely contains localhost", () => {
    expect(isLocalUrl("https://shreyash.blear.in")).toBe(false)
    expect(isLocalUrl("https://localhost.example.com")).toBe(false)
  })

  it("treats an unparseable url as public", () => {
    expect(isLocalUrl("not a url")).toBe(false)
  })
})
