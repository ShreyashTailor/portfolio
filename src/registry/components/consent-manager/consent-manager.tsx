"use client"

import {
  ConsentBanner,
  ConsentDialog,
  ConsentManagerProvider,
  type Theme,
} from "@c15t/nextjs"

import { buttonVariants } from "@/components/ui/button"

const theme = {
  colors: {
    primary: "var(--primary)",
    primaryHover: "color-mix(in oklab, var(--primary) 80%, transparent)",
    surface: "var(--popover)",
    surfaceHover: "var(--accent)",
    border: "var(--border)",
    borderHover: "var(--ring)",
    text: "var(--popover-foreground)",
    textMuted: "var(--muted-foreground)",
    textOnPrimary: "var(--primary-foreground)",
    overlay: "lab(0% 0 0 / 0.2)",
    switchTrack: "var(--input)",
    switchTrackActive: "var(--primary)",
    switchThumb: "var(--background)",
  },
  dark: {
    overlay: "lab(0% 0 0 / 0.4)",
  },
  typography: {
    fontFamily: "var(--font-sans)",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "1rem",
  },
  shadows: {
    lg: "0 0 0 1px var(--border), 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)",
  },
  consentActions: {
    default: { variant: "neutral", mode: "lighter" },
    accept: { variant: "neutral", mode: "lighter" },
    reject: { variant: "neutral", mode: "lighter" },
    customize: { variant: "primary", mode: "filled" },
  },
  slots: {
    consentBannerCard: "divide-y",
    consentBannerFooter: "bg-transparent",
    consentBannerTitle: "text-base leading-none font-medium",
    consentBannerDescription: "text-sm",
    consentDialogTitle: "text-base leading-none font-medium tracking-tight",
    consentDialogDescription: "text-sm",
    consentDialogFooter: "border-t",
    consentWidgetFooterSubGroup: "grid grid-cols-2 gap-4 sm:flex",
    buttonPrimary: buttonVariants({ variant: "default" }),
    buttonSecondary: buttonVariants({ variant: "secondary" }),
  },
} satisfies Theme

export function ConsentManager({ children }: { children: React.ReactNode }) {
  return (
    <ConsentManagerProvider
      options={{
        mode: "offline",
        consentCategories: ["necessary", "measurement"],
        // overrides: { country: "DE" }, // Useful for development to always view the banner.
        theme,
      }}
    >
      <ConsentBanner />

      <ConsentDialog />

      {children}
    </ConsentManagerProvider>
  )
}
