import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ShreyashMark } from "@/components/shreyash-mark"

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-screen items-center justify-center px-2 md:max-w-3xl">
      <section className="w-full border-x border-line">
        <div className="screen-line-top screen-line-bottom screen-line-bottom-border screen-line-top-border">
          <div className="flex flex-col items-center gap-6 px-6 py-16 text-center">
            <ShreyashMark className="h-6 text-muted-foreground" />

            <p
              aria-hidden
              className="font-mono text-7xl font-medium tracking-tighter text-muted-foreground/40 tabular-nums sm:text-8xl"
            >
              404
            </p>

            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-medium tracking-tight text-balance">
                Page not found
              </h1>
              <p className="mx-auto max-w-sm text-sm text-balance text-muted-foreground">
                The page you are looking for doesn&apos;t exist or has been
                moved.
              </p>
            </div>

            <Button
              variant="outline"
              nativeButton={false}
              render={
                <Link href="/">
                  <ArrowLeftIcon />
                  Back to Home
                </Link>
              }
            />
          </div>
        </div>
      </section>
    </div>
  )
}
