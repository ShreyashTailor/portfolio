import { SITE_INFO } from "@/config/site"

export { cn } from "cn"

export function absoluteUrl(path: string) {
  return `${SITE_INFO.url}${path}`
}
